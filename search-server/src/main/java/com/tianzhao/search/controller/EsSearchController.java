package com.tianzhao.search.controller;

import com.tianzhao.search.common.DocumentTypeEnum;
import com.tianzhao.search.document.ProductDocument;
import com.tianzhao.search.page.Page;
import com.tianzhao.search.service.BaseSearchService;
import com.tianzhao.search.service.EsSearchService;
import com.tianzhao.search.service.impl.BaseSearchServiceImpl;
import com.tzkj.commons.web.ApiResult;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * elasticsearch 搜索
 * @author zzc
 * @version 0.1
 */
@RestController
@RequestMapping("api")
public class EsSearchController {
    private Logger log = LoggerFactory.getLogger(getClass());

    private final static String[] DEFAULT_FIELDS = {"businessId","title","description"};

    @Resource(name="baseSearchServiceImpl")
    private BaseSearchService searchService;


    /**
     * 搜索，命中关键字高亮
     * http://localhost:8080/query_hit?keyword=无印良品荣耀&indexName=orders&fields=productName,productDesc
     * @param keyword   关键字
     * @param indexName 索引库名称
     * @param fields    搜索字段名称，多个以“，”分割
     * @return
     */
    @RequestMapping("query_hit")
    public List<Map<String,Object>> queryHit(@RequestParam String keyword, @RequestParam String indexName, @RequestParam String fields){
        String[] fieldNames = {};
        if(fields.contains(",")) fieldNames = fields.split(",");
        else fieldNames[0] = fields;
        return searchService.queryHit(keyword,indexName,fieldNames);
    }

    /**
     * 搜索，命中关键字高亮
     * http://localhost:8080/query_hit?keyword=停水&indexs=case,item&fields=businessId,title,description
     * @param keyword   关键字
     * @param indices 索引库名称
     * @param fields    搜索字段名称，多个以“，”分割
     * @return
     */
    @RequestMapping("mutil_query_hit")
    public ApiResult mutilQueryHit(@RequestParam String keyword, @RequestParam(required = false) String indices, @RequestParam(required = false) String fields){
        String[] fieldNames = {};
        if(StringUtils.isEmpty(indices)){
            fieldNames = this.DEFAULT_FIELDS;
        }else{
            if(fields.contains(",")) fieldNames = fields.split(",");
            else fieldNames[0] = fields;
        }

        String[] indexNames = {};
        if(StringUtils.isEmpty(indices)){
            indexNames = DocumentTypeEnum.getIndices();
        }else{
            if(indices.contains(",")) indexNames = indices.split(",");
            else indexNames[0] = indices;
        }
        return ApiResult.success("list", searchService.mutilQueryHit(keyword,indexNames,fieldNames));
    }

    /**
     * 搜索，命中关键字高亮
     * @param pageNo 当前页
     * @param pageSize 每页显示的数据条数
     * @param keyword 关键字
     * @param indices  索引库名称
     * @param fields 检索字段
     * @return
     */
    @RequestMapping("mutil_query_hit_page")
    public Page<Map<String, Object>> mutilQueryHitByPage(@RequestParam int pageNo, @RequestParam int pageSize,
                                                        @RequestParam String keyword, @RequestParam(required = false) String indices,
                                                        @RequestParam(required = false) String fields){
        String[] fieldNames = {};
        if(StringUtils.isEmpty(indices)){
            fieldNames = this.DEFAULT_FIELDS;
        }else{
            if(fields.contains(",")) fieldNames = fields.split(",");
            else fieldNames[0] = fields;
        }

        String[] indexNames = {};
        if(StringUtils.isEmpty(indices)){
            indexNames = DocumentTypeEnum.getIndices();
        }else{
            if(indices.contains(",")) indexNames = indices.split(",");
            else indexNames[0] = indices;
        }
        
        return searchService.mutilQueryHitPage(pageNo,pageSize,keyword,indexNames,fieldNames);
    }


    /**
     * 搜索，命中关键字高亮
     * http://localhost:8080/query_hit_page?keyword=停水&indexName=case&fields=title,description&pageNo=1&pageSize=1
     * @param pageNo    当前页
     * @param pageSize  每页显示的数据条数
     * @param keyword   关键字
     * @param indexName 索引库名称
     * @param fields    搜索字段名称，多个以“，”分割
     * @return
     */
    @RequestMapping("query_hit_page")
    public Page<Map<String,Object>> queryHitByPage(@RequestParam int pageNo, @RequestParam int pageSize
                                                    , @RequestParam String keyword, @RequestParam String indexName, @RequestParam String fields){
        String[] fieldNames = {};
        if(fields.contains(",")) fieldNames = fields.split(",");
        else fieldNames[0] = fields;
        return searchService.queryHitByPage(pageNo,pageSize,keyword,indexName,fieldNames);
    }

    /**
     * 删除索引库
     * @param indexName
     * @return
     */
    @RequestMapping("delete_index/{indexName}")
    public String deleteIndex(@PathVariable String indexName){
        searchService.deleteIndex(indexName);
        return "success";
    }
}
