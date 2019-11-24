package com.tianzhao.search.repository;

import com.tianzhao.search.common.DocumentTypeEnum;
import com.tianzhao.search.document.KnowledgeDocument;
import com.tianzhao.search.document.builder.KnowledgeDocumentBuilder;
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
public class KnowlegeRepository {

    @Autowired
    @Qualifier("knowlegeJdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    public List<KnowledgeDocument> loadNewData(String lastLoadTime) {
//        String sql = "select m.ID,m.CONTENT_TITLE,m.CONTENT_TEXT,c.CLAZZ_NAME from T_CONTENT_MSG m " +
//                " left join KNOWLEDGE.T_CLAZZ c on m.clazz_id = c.id " +
//                " where m.CREATE_TIME >= to_date('"+lastLoadTime+"','yyyy-mm-dd hh24:mi:ss')"+" OR m.MODIFY_TIME >= to_date('"+lastLoadTime+"','yyyy-mm-dd hh24:mi:ss')";

        String sql = "select m.ID,m.CONTENT_TITLE,m.CONTENT_TEXT,c.CLAZZ_NAME from T_CONTENT_MSG m " +
                " left join KNOWLEDGE.T_CLAZZ c on m.clazz_id = c.id " +
                " where m.IS_DELETE = 0 AND m.IS_ENABLE = 1";


        List<KnowledgeDocument> knowledgeDocumentList = jdbcTemplate.query(sql,
                new RowMapper<KnowledgeDocument>() {
                    @Override
                    public KnowledgeDocument mapRow(ResultSet rs, int i) throws SQLException {
                        String html = rs.getString("CONTENT_TEXT");
                        if(StringUtils.isEmpty(html)) html="";
                        KnowledgeDocument knowledgeDocument = KnowledgeDocumentBuilder.create()
                                .addBusinessId(rs.getString("ID"))
                                .addType(DocumentTypeEnum.KNOWLEDGE.getValue())
                                .addTitle(rs.getString("CONTENT_TITLE")+"("+rs.getString("CLAZZ_NAME")+")")
                                .addDescription(Html2Text(html))
                                .addCreateTime(new Date())
                                .addResource("知识库")
                                .builder();
                        return knowledgeDocument;
                    }
                });
        return knowledgeDocumentList != null && knowledgeDocumentList.size() > 0 ? knowledgeDocumentList : null;
    }

    public static String Html2Text(String inputString){
        String htmlStr = inputString; //含html标签的字符串
        String textStr ="";
        java.util.regex.Pattern p_script;
        java.util.regex.Matcher m_script;
        java.util.regex.Pattern p_style;
        java.util.regex.Matcher m_style;
        java.util.regex.Pattern p_html;
        java.util.regex.Matcher m_html;
        try{
            String regEx_script = "<[\\s]*?script[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?script[\\s]*?>"; //定义script的正则表达式{或<script[^>]*?>[\\s\\S]*?<\\/script> }
            String regEx_style = "<[\\s]*?style[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?style[\\s]*?>"; //定义style的正则表达式{或<style[^>]*?>[\\s\\S]*?<\\/style> }
            String regEx_html = "<[^>]+>"; //定义HTML标签的正则表达式
            p_script = Pattern.compile(regEx_script,Pattern.CASE_INSENSITIVE);
            m_script = p_script.matcher(htmlStr);
            htmlStr = m_script.replaceAll(""); //过滤script标签
            p_style = Pattern.compile(regEx_style,Pattern.CASE_INSENSITIVE);
            m_style = p_style.matcher(htmlStr);
            htmlStr = m_style.replaceAll(""); //过滤style标签
            p_html = Pattern.compile(regEx_html,Pattern.CASE_INSENSITIVE);
            m_html = p_html.matcher(htmlStr);
            htmlStr = m_html.replaceAll(""); //过滤html标签
            textStr = htmlStr;
        }catch(Exception e){
            e.printStackTrace();
        }
        return textStr;//返回文本字符串
    }
}
