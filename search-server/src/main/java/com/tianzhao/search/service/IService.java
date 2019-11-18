package com.tianzhao.search.service;

import com.tianzhao.search.document.CaseDocument;

import java.util.List;

/**
 * Created by zzc on 2019/11/16.
 */
public interface IService<T> {
    /**
     * 保存
     */
    void save(T... caseDocuments);

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
    T getById(String id);

    /**
     * 查询全部
     * @return
     */
    List<T> getAll();
}
