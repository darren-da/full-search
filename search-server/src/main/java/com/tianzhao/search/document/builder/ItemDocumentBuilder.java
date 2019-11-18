package com.tianzhao.search.document.builder;

import com.tianzhao.search.document.CaseDocument;
import com.tianzhao.search.document.ItemDocument;

import java.util.Date;

/**
 * Created by zzc on 2019/11/16.
 */
public class ItemDocumentBuilder {
    private static ItemDocument itemDocument;

    public static ItemDocumentBuilder create(){
        itemDocument = new ItemDocument();
        return new ItemDocumentBuilder();
    }

    public ItemDocumentBuilder addId(String id) {
        itemDocument.setId(id);
        return this;
    }

    public ItemDocumentBuilder addBusinessId(String businessId) {
        itemDocument.setBusinessId(businessId);
        return this;
    }

    public ItemDocumentBuilder addType(String type) {
        itemDocument.setType(type);
        return this;
    }

    public ItemDocumentBuilder addTitle(String title) {
        itemDocument.setTitle(title);
        return this;
    }

    public ItemDocumentBuilder addDescription(String description){
        itemDocument.setDescription(description);
        return this;
    }

    public ItemDocumentBuilder addCreateTime(Date createTime) {
        itemDocument.setCreateTime(createTime);
        return this;
    }

    public ItemDocument builder() {
        return itemDocument;
    }
}
