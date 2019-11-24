package com.tianzhao.search.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
public class JdbcTemplateDataSourceConfig {

    @Bean
    JdbcTemplate knowlegeJdbcTemplate(@Qualifier("knowlegeDataSource")DataSource knowlegeDataSource){
        return new JdbcTemplate(knowlegeDataSource);
    }

    @Bean
    JdbcTemplate caseJdbcTemplate(@Qualifier("caseDataSource")DataSource caseDataSource){
        return new JdbcTemplate(caseDataSource);
    }

    @Bean
    JdbcTemplate searchJdbcTemplate(@Qualifier("searchDataSource")DataSource searchDataSource){
        return new JdbcTemplate(searchDataSource);
    }

    @Bean
    JdbcTemplate filesJdbcTemplate(@Qualifier("filesDataSource")DataSource filesDataSource){
        return new JdbcTemplate(filesDataSource);
    }

    // 事务管理器
    @Bean
    public PlatformTransactionManager masterTransactionManager(@Qualifier("knowlegeDataSource")DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    // 事务管理器
    @Bean
    public PlatformTransactionManager slaveTransactionManager(@Qualifier("caseDataSource")DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

}