package com.tianzhao.search.service.impl;

import com.alibaba.fastjson.JSON;
import com.tianzhao.search.document.MediaFileDocument;
import com.tianzhao.search.repository.IMediaFileDocumentRepository;
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
public class MediaFileServiceImpl extends BaseSearchServiceImpl implements IService<MediaFileDocument> {
    private Logger log = LoggerFactory.getLogger(getClass());
    @Resource
    private ElasticsearchTemplate elasticsearchTemplate;
    @Resource
    private IMediaFileDocumentRepository mediaFileDocumentRepository;

    @Override
    public void save(MediaFileDocument... knowledgeDocuments) {
        elasticsearchTemplate.putMapping(MediaFileDocument.class);
        if(knowledgeDocuments.length > 0){
            log.info("【保存索引】：{}", JSON.toJSONString(mediaFileDocumentRepository.saveAll(Arrays.asList(knowledgeDocuments))));
        }
    }

    @Override
    public void delete(String id) {
        mediaFileDocumentRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        mediaFileDocumentRepository.deleteAll();
    }

    @Override
    public MediaFileDocument getById(String id) {
        return mediaFileDocumentRepository.findById(id).get();
    }

    @Override
    public List<MediaFileDocument> getAll() {
        List<MediaFileDocument> list = new ArrayList<>();
        mediaFileDocumentRepository.findAll().forEach(list::add);
        return list;
    }
}
