package com.tianzhao.search.common;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by zzc on 2019/11/16.
 */
public enum  DocumentTypeEnum implements BaseEnum<DocumentTypeEnum,String> {
    CASE("1", "案卷","case"),
    KNOWLEDGE("2","知识库","knowledge"),
    ITEM("3","分理项","item"),
    MEDIA_FILE("4","多媒体文件","media_file")
    ;

    static Map<String, DocumentTypeEnum> dataMap = new HashMap<>();

    static {
        Arrays.stream(DocumentTypeEnum.values()).forEach(en -> dataMap.put(en.getValue(), en));
    }

    private String value;
    private String displayName;
    private String indexName;

    DocumentTypeEnum(String value, String displayName,String indexName) {
        this.value = value;
        this.displayName = displayName;
        this.indexName = indexName;
    }

    public static DocumentTypeEnum getEnum(String value) {
        return dataMap.get(value);
    }

    @Override
    public String getValue() {
        return this.value;
    }

    @Override
    public String getDisplayName() {
        return this.displayName;
    }

    public static String[] getIndices(){
        DocumentTypeEnum[] documentTypeEnums = DocumentTypeEnum.values();
        String[] indices = new String[documentTypeEnums.length];
        for (int i = 0; i < documentTypeEnums.length; i++) {
            indices[i] = documentTypeEnums[i].indexName;
        }
        return indices;
    }
}
