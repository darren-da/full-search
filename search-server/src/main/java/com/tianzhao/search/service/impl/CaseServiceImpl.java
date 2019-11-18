package com.tianzhao.search.service.impl;

import com.alibaba.fastjson.JSON;
import com.tianzhao.search.document.CaseDocument;
import com.tianzhao.search.repository.ICaseDocumentRepository;
import com.tianzhao.search.service.IService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by zzc on 2019/11/16.
 */
@Service
public class CaseServiceImpl extends BaseSearchServiceImpl implements IService<CaseDocument> {
    private Logger log = LoggerFactory.getLogger(getClass());
    @Resource
    private ElasticsearchTemplate elasticsearchTemplate;
    @Resource
    private ICaseDocumentRepository caseDocumentRepository;

    @Override
    public void save(CaseDocument ... caseDocuments) {
        elasticsearchTemplate.putMapping(CaseDocument.class);
        if(caseDocuments.length > 0){
            /*Arrays.asList(productDocuments).parallelStream()
                    .map(productDocumentRepository::save)
                    .forEach(productDocument -> log.info("【保存数据】：{}", JSON.toJSONString(productDocument)));*/
            log.info("【保存索引】：{}", JSON.toJSONString(caseDocumentRepository.saveAll(Arrays.asList(caseDocuments))));
        }
    }

    @Override
    public void delete(String id) {
        caseDocumentRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        caseDocumentRepository.deleteAll();
    }

    @Override
    public CaseDocument getById(String id) {
        return caseDocumentRepository.findById(id).get();
    }

    @Override
    public List<CaseDocument> getAll() {
        List<CaseDocument> list = new ArrayList<>();
        caseDocumentRepository.findAll().forEach(list::add);
        return list;
    }
}
