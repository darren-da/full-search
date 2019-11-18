package com.tianzhao.search.document.builder;

import com.tianzhao.search.document.CaseDocument;

import java.util.Date;

/**
 * Created by zzc on 2019/11/16.
 */
public class CaseDocumentBuilder {
    private static CaseDocument caseDocument;

    public static CaseDocumentBuilder create(){
        caseDocument = new CaseDocument();
        return new CaseDocumentBuilder();
    }

    public CaseDocumentBuilder addId(String id) {
        caseDocument.setId(id);
        return this;
    }

    public CaseDocumentBuilder addBusinessId(String businessId) {
        caseDocument.setBusinessId(businessId);
        return this;
    }

    public CaseDocumentBuilder addType(String type) {
        caseDocument.setType(type);
        return this;
    }

    public CaseDocumentBuilder addTitle(String title) {
        caseDocument.setTitle(title);
        return this;
    }

    public CaseDocumentBuilder addDescription(String description){
        caseDocument.setDescription(description);
        return this;
    }

    public CaseDocumentBuilder addCreateTime(Date createTime) {
        caseDocument.setCreateTime(createTime);
        return this;
    }

    public CaseDocument builder() {
        return caseDocument;
    }
}
