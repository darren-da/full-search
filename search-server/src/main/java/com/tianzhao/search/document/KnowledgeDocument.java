package com.tianzhao.search.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Mapping;

import java.util.Date;

/**
 * 知识库文档
 * Created by zzc on 2019/11/16.
 */
@Document(indexName = "knowledge")
@Mapping(mappingPath = "knowledge.json")
public class KnowledgeDocument {
    @Id
    private String id;
    /**
     * 业务ID
     */
    private String businessId;
    /**
     * 文档类型
     */
    private String type;
    /**
     * 标题
     */
    private String title;
    /**
     * 描述
     */
    private String description;
    /**
     * 创建时间
     */
    private Date createTime;
    /**
     * 数据来源
     */
    private String resource;

    public KnowledgeDocument(){

    }

    public KnowledgeDocument(String businessId, String title, String description) {
        this.businessId = businessId;
        this.title = title;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBusinessId() {
        return businessId;
    }

    public void setBusinessId(String businessId) {
        this.businessId = businessId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getResource() {
        return resource;
    }

    public void setResource(String resource) {
        this.resource = resource;
    }
}
