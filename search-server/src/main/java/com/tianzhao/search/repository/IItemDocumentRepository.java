package com.tianzhao.search.repository;

import com.tianzhao.search.document.ItemDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Component;

/**
 * Created by zzc on 2019/11/16.
 */
@Component
public interface IItemDocumentRepository extends ElasticsearchRepository<ItemDocument,String> {
}
