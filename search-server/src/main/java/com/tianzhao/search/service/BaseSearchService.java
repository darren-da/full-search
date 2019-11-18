package com.tianzhao.search.service;



import com.tianzhao.search.page.Page;

import java.util.List;
import java.util.Map;

/**
 * @author zzc
 * @version 0.1
 */
public interface BaseSearchService {

    /**
     * 搜索高亮显示
     * @param keyword       关键字
     * @param indexName     索引库
     * @param fieldNames    搜索的字段
     * @return
     */
    List<Map<String,Object>> queryHit(String keyword, String indexName, String... fieldNames);

    /**
     * 搜索高亮（多index）
     * @param keyword   关键字
     * @param indexNames 索引
     * @param fieldNames 字段
     * @return
     */
    List<Map<String,Object>> mutilQueryHit(String keyword, String[] indexNames, String[] fieldNames);

    /**
     * 搜索高亮显示，返回分页
     * @param pageNo        当前页
     * @param pageSize      每页显示的总条数
     * @param keyword       关键字
     * @param indexName     索引库
     * @param fieldNames    搜索的字段
     * @return
     */
    Page<Map<String,Object>> queryHitByPage(int pageNo, int pageSize, String keyword, String indexName, String... fieldNames);

    /**
     * 删除索引库
     * @param indexName
     * @return
     */
    void deleteIndex(String indexName);

    Page<Map<String, Object>> mutilQueryHitPage(int pageNo, int pageSize, String keyword, String[] indexNames, String[] fieldNames);
}
