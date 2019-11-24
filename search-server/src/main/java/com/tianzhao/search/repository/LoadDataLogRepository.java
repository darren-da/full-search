package com.tianzhao.search.repository;

import com.tianzhao.search.entity.LoadDataLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class LoadDataLogRepository {

    public static String KNOWLEGE = "knowlege";
    public static String FILE = "file";
    public static String CASE = "case";
    public static String SEPARATION = "separation";

    @Autowired
    @Qualifier("searchJdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    public int insertLog(LoadDataLog loadDataLog) {
        String sql = "insert into T_LOAD_DATA_LOG(ID, LOAD_RESOURCE, DATA_COUNT, LOAD_TIME, LOAD_RESULT) values(?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql,
                loadDataLog.getId(), loadDataLog.getLoadResource(),
                loadDataLog.getDataCount(), loadDataLog.getLoadTime(),
                loadDataLog.getLoadResult());
//        String sql = "insert into T_LOAD_DATA_LOG(ID, LOAD_RESOURCE, DATA_COUNT, LOAD_TIME, LOAD_RESULT) " +
//                " value('"+loadDataLog.getId()+"', '"+loadDataLog.getLoadResource()+"', "+loadDataLog.getDataCount()+", '"+loadDataLog.getLoadTime()+"', "+loadDataLog.getLoadResult()+")";
//        return jdbcTemplate.update(sql);
    }

    public LoadDataLog findLastLog(String resource) {
        String sql = "select * from T_LOAD_DATA_LOG where LOAD_RESOURCE = ? and LOAD_RESULT = 1 order by LOAD_TIME desc limit 0,1";
        List<LoadDataLog> loadDataLogList = jdbcTemplate.query(sql,
                new RowMapper<LoadDataLog>() {
                    @Override
                    public LoadDataLog mapRow(ResultSet rs, int i) throws SQLException {
                        LoadDataLog loadDataLog = new LoadDataLog(resource);
                        loadDataLog.setId(rs.getString("ID"));
                        loadDataLog.setLoadResource(rs.getString("LOAD_RESOURCE"));
                        loadDataLog.setDataCount(rs.getLong("DATA_COUNT"));
                        loadDataLog.setLoadTime(rs.getString("LOAD_TIME"));
                        loadDataLog.setLoadResult(rs.getInt("LOAD_RESULT"));
                        return loadDataLog;
                    }
                }, resource);
        return loadDataLogList != null && loadDataLogList.size() > 0 ? loadDataLogList.get(0) : null;
    }


}
