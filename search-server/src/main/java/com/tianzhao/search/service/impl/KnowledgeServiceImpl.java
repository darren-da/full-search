package com.tianzhao.search.service.impl;

import com.alibaba.fastjson.JSON;
import com.tianzhao.search.document.KnowledgeDocument;
import com.tianzhao.search.repository.IKnowledgeDocumentRepository;
import com.tianzhao.search.service.IService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by zzc on 2019/11/16.
 */
@Service
public class KnowledgeServiceImpl extends BaseSearchServiceImpl implements IService<KnowledgeDocument> {
    private Logger log = LoggerFactory.getLogger(getClass());
    @Resource
    private ElasticsearchTemplate elasticsearchTemplate;
    @Resource
    private IKnowledgeDocumentRepository knowledgeDocumentRepository;

    @Override
    public void save(KnowledgeDocument... knowledgeDocuments) {
        elasticsearchTemplate.putMapping(KnowledgeDocument.class);
        if(knowledgeDocuments.length > 0){
            log.info("【保存索引】：{}", JSON.toJSONString(knowledgeDocumentRepository.saveAll(Arrays.asList(knowledgeDocuments))));
        }
    }

    public void save(List<KnowledgeDocument> list) {
        elasticsearchTemplate.putMapping(KnowledgeDocument.class);
        if( !CollectionUtils.isEmpty(list) ){
            log.info("【保存索引】：{}", JSON.toJSONString(knowledgeDocumentRepository.saveAll(list)));
        }
    }

    @Override
    public void delete(String id) {
        knowledgeDocumentRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        knowledgeDocumentRepository.deleteAll();
    }

    @Override
    public KnowledgeDocument getById(String id) {
        return knowledgeDocumentRepository.findById(id).get();
    }

    @Override
    public List<KnowledgeDocument> getAll() {
        List<KnowledgeDocument> list = new ArrayList<>();
        knowledgeDocumentRepository.findAll().forEach(list::add);
        return list;
    }
}
