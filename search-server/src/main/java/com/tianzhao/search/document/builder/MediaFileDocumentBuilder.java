package com.tianzhao.search.document.builder;

import com.tianzhao.search.document.MediaFileDocument;

import java.util.Date;

/**
 * Created by zzc on 2019/11/16.
 */
public class MediaFileDocumentBuilder {
    private static MediaFileDocument mediaFileDocument;

    public static MediaFileDocumentBuilder create(){
        mediaFileDocument = new MediaFileDocument();
        return new MediaFileDocumentBuilder();
    }

    public MediaFileDocumentBuilder addId(String id) {
        mediaFileDocument.setId(id);
        return this;
    }

    public MediaFileDocumentBuilder addBusinessId(String businessId) {
        mediaFileDocument.setBusinessId(businessId);
        return this;
    }

    public MediaFileDocumentBuilder addType(String type) {
        mediaFileDocument.setType(type);
        return this;
    }

    public MediaFileDocumentBuilder addTitle(String title) {
        mediaFileDocument.setTitle(title);
        return this;
    }

    public MediaFileDocumentBuilder addDescription(String description){
        mediaFileDocument.setDescription(description);
        return this;
    }

    public MediaFileDocumentBuilder addCreateTime(Date createTime) {
        mediaFileDocument.setCreateTime(createTime);
        return this;
    }

    public MediaFileDocument builder() {
        return mediaFileDocument;
    }
}
