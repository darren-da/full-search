package com.tianzhao.search.service;



import com.tianzhao.search.document.ProductDocument;

import java.util.List;

/**
 * @author zzc
 * @version 0.1
 */
public interface EsSearchService extends BaseSearchService {
    /**
     * 保存
     * @auther: zzc
     */
    void save(ProductDocument... productDocuments);

    /**
     * 删除
     * @param id
     */
    void delete(String id);

    /**
     * 清空索引
     */
    void deleteAll();

    /**
     * 根据ID查询
     * @param id
     * @return
     */
    ProductDocument getById(String id);

    /**
     * 查询全部
     * @return
     */
    List<ProductDocument> getAll();


}
