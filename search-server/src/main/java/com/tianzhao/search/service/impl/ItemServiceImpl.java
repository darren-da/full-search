package com.tianzhao.search.service.impl;

import com.alibaba.fastjson.JSON;
import com.tianzhao.search.document.CaseDocument;
import com.tianzhao.search.document.ItemDocument;
import com.tianzhao.search.repository.ICaseDocumentRepository;
import com.tianzhao.search.repository.IItemDocumentRepository;
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
public class ItemServiceImpl extends BaseSearchServiceImpl implements IService<ItemDocument> {
    private Logger log = LoggerFactory.getLogger(getClass());
    @Resource
    private ElasticsearchTemplate elasticsearchTemplate;
    @Resource
    private IItemDocumentRepository itemDocumentRepository;

    @Override
    public void save(ItemDocument... itemDocuments) {
        elasticsearchTemplate.putMapping(ItemDocument.class);
        if(itemDocuments.length > 0){
            log.info("【保存索引】：{}", JSON.toJSONString(itemDocumentRepository.saveAll(Arrays.asList(itemDocuments))));
        }
    }

    @Override
    public void delete(String id) {
        itemDocumentRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        itemDocumentRepository.deleteAll();
    }

    @Override
    public ItemDocument getById(String id) {
        return itemDocumentRepository.findById(id).get();
    }

    @Override
    public List<ItemDocument> getAll() {
        List<ItemDocument> list = new ArrayList<>();
        itemDocumentRepository.findAll().forEach(list::add);
        return list;
    }
}
