package com.tianzhao.search.entity;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class LoadDataLog {

    public LoadDataLog(String loadResource) {
        this.id = UUID.randomUUID().toString().replaceAll("-", "");
        this.loadResource = loadResource;
        SimpleDateFormat sdf = new SimpleDateFormat("yyy-MM-dd HH:mm:ss");
        this.loadTime = sdf.format(new Date());
    }

    private String id;

    private String loadResource;

    private long dataCount;

    private String loadTime;

    private int loadResult;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public long getDataCount() {
        return dataCount;
    }

    public void setDataCount(long dataCount) {
        this.dataCount = dataCount;
    }

    public String getLoadTime() {
        return loadTime;
    }

    public void setLoadTime(String loadTime) {
        this.loadTime = loadTime;
    }

    public String getLoadResource() {
        return loadResource;
    }

    public void setLoadResource(String loadResource) {
        this.loadResource = loadResource;
    }

    public int getLoadResult() {
        return loadResult;
    }

    public void setLoadResult(int loadResult) {
        this.loadResult = loadResult;
    }
}
