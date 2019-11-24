package com.tianzhao.search.document.builder;

import com.tianzhao.search.document.KnowledgeDocument;

import java.util.Date;

/**
 * Created by zzc on 2019/11/16.
 */
public class KnowledgeDocumentBuilder {
    private static KnowledgeDocument knowledgeDocument;

    public static KnowledgeDocumentBuilder create(){
        knowledgeDocument = new KnowledgeDocument();
        return new KnowledgeDocumentBuilder();
    }

    public KnowledgeDocumentBuilder addId(String id) {
        knowledgeDocument.setId(id);
        return this;
    }

    public KnowledgeDocumentBuilder addBusinessId(String businessId) {
        knowledgeDocument.setBusinessId(businessId);
        return this;
    }

    public KnowledgeDocumentBuilder addType(String type) {
        knowledgeDocument.setType(type);
        return this;
    }

    public KnowledgeDocumentBuilder addTitle(String title) {
        knowledgeDocument.setTitle(title);
        return this;
    }

    public KnowledgeDocumentBuilder addDescription(String description){
        knowledgeDocument.setDescription(description);
        return this;
    }

    public KnowledgeDocumentBuilder addCreateTime(Date createTime) {
        knowledgeDocument.setCreateTime(createTime);
        return this;
    }

    public KnowledgeDocumentBuilder addResource(String resource) {
        knowledgeDocument.setResource(resource);
        return this;
    }

    public KnowledgeDocument builder() {
        return knowledgeDocument;
    }
}
