package com.tianzhao.search.common;

/**
 * Created by zzc on 2019/11/16.
 */
public interface BaseEnum<E extends Enum<?>, T> {
    T getValue();
    String getDisplayName();
}
