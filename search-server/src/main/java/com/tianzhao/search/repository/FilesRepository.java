package com.tianzhao.search.repository;

import com.tianzhao.search.common.DocumentTypeEnum;
import com.tianzhao.search.document.KnowledgeDocument;
import com.tianzhao.search.document.MediaFileDocument;
import com.tianzhao.search.document.builder.KnowledgeDocumentBuilder;
import com.tianzhao.search.document.builder.MediaFileDocumentBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.regex.Pattern;

@Repository
public class FilesRepository {

    @Autowired
    @Qualifier("filesJdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    public List<MediaFileDocument> loadNewData(String lastLoadTime) {
        String sql = "select FILE_ID,NAME,UPLOAD_TIME from UPLOAD_FILE where COMMON_TYPE = 1 AND COMMON_CAN_USE IS NULL";
        List<MediaFileDocument> mediaFileDocuments = jdbcTemplate.query(sql,
                new RowMapper<MediaFileDocument>() {
                    @Override
                    public MediaFileDocument mapRow(ResultSet rs, int i) throws SQLException {
                        String html = rs.getString("CONTENT_TEXT");
                        if(StringUtils.isEmpty(html)) html="";
                        MediaFileDocument document = MediaFileDocumentBuilder.create()
                                .addBusinessId(rs.getString("FILE_ID"))
                                .addType(DocumentTypeEnum.MEDIA_FILE.getValue())
                                .addTitle(rs.getString("NAME"))
                                .addDescription(rs.getString("UPLOAD_TIME"))
                                .addCreateTime(new Date())
                                .addResource("公共文件")
                                .builder();
                        return document;
                    }
                });
        return mediaFileDocuments != null && mediaFileDocuments.size() > 0 ? mediaFileDocuments : null;
    }
}
