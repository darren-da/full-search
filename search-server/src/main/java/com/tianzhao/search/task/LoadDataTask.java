package com.tianzhao.search.task;

import com.tianzhao.search.document.KnowledgeDocument;
import com.tianzhao.search.document.MediaFileDocument;
import com.tianzhao.search.entity.LoadDataLog;
import com.tianzhao.search.repository.FilesRepository;
import com.tianzhao.search.repository.KnowlegeRepository;
import com.tianzhao.search.repository.LoadDataLogRepository;
import com.tianzhao.search.service.impl.KnowledgeServiceImpl;
import com.tianzhao.search.service.impl.MediaFileServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Component
public class LoadDataTask {

    @Autowired
    private LoadDataLogRepository loadDataLogRepository;

    @Autowired
    private KnowlegeRepository knowlegeRepository;
    @Autowired
    private KnowledgeServiceImpl knowledgeService;

    @Autowired
    private FilesRepository filesRepository;
    @Autowired
    private MediaFileServiceImpl mediaFileService;

    private Logger log = LoggerFactory.getLogger(getClass());

    private void printLog(String time, String type, int result){
        log.info("同步时间："+time+":  【"+type+"数据同步"+ (result==1?"成功":"失败") +"！】");
    }

//    @Scheduled(fixedDelay = 10000)
    @Scheduled(cron="0 0 1 * * ?")
    public void knowlegeTask() {
        LoadDataLog lastLog = loadDataLogRepository.findLastLog(LoadDataLogRepository.KNOWLEGE);
        List<KnowledgeDocument> newDataList ;
        if(lastLog==null){
            newDataList = knowlegeRepository.loadNewData("2000-01-01 00:00:00");
        } else {
            newDataList = knowlegeRepository.loadNewData(lastLog.getLoadTime());
        }

        LoadDataLog newLog = new LoadDataLog( LoadDataLogRepository.KNOWLEGE );
        try {
            knowledgeService.deleteAll();
            knowledgeService.save(newDataList);
            newLog.setDataCount( newDataList==null?0:newDataList.size() );
            newLog.setLoadResult(1);
            printLog(newLog.getLoadTime(),"知识库", newLog.getLoadResult());
        } catch (Exception e){
            newLog.setDataCount(0);
            newLog.setLoadResult(0);
            printLog(newLog.getLoadTime(),"知识库", newLog.getLoadResult());
        } finally {
            loadDataLogRepository.insertLog(newLog);
        }
    }

    @Scheduled(cron="0 0 1 * * ?")
    public void filesTask() {
        LoadDataLog lastLog = loadDataLogRepository.findLastLog(LoadDataLogRepository.FILE);
        List<MediaFileDocument> newDataList ;
        if(lastLog==null){
            newDataList = filesRepository.loadNewData("2000-01-01 00:00:00");
        } else {
            newDataList = filesRepository.loadNewData(lastLog.getLoadTime());
        }

        LoadDataLog newLog = new LoadDataLog( LoadDataLogRepository.FILE );
        try {
            mediaFileService.deleteAll();
            mediaFileService.save(newDataList);
            newLog.setDataCount( newDataList==null?0:newDataList.size() );
            newLog.setLoadResult(1);
            printLog(newLog.getLoadTime(),"公共文件", newLog.getLoadResult());
        } catch (Exception e){
            newLog.setDataCount(0);
            newLog.setLoadResult(0);
            printLog(newLog.getLoadTime(),"公共文件", newLog.getLoadResult());
        } finally {
            loadDataLogRepository.insertLog(newLog);
        }
    }
}
