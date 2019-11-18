package com.tianzhao.search;



import com.alibaba.fastjson.JSON;
import com.tianzhao.search.common.DocumentTypeEnum;
import com.tianzhao.search.document.*;
import com.tianzhao.search.document.builder.CaseDocumentBuilder;
import com.tianzhao.search.document.builder.ItemDocumentBuilder;
import com.tianzhao.search.page.Page;
import com.tianzhao.search.service.BaseSearchService;
import com.tianzhao.search.service.EsSearchService;
import com.tianzhao.search.service.IService;
import com.tianzhao.search.service.impl.BaseSearchServiceImpl;
import com.tianzhao.search.service.impl.CaseServiceImpl;
import com.tianzhao.search.service.impl.ItemServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SearchApplicationTests {

	private Logger log = LoggerFactory.getLogger(getClass());

	@Resource(name="baseSearchServiceImpl")
	private BaseSearchServiceImpl searchService;

	@Autowired
	private CaseServiceImpl caseService;

	@Autowired
	private ItemServiceImpl itemService;

	@Test
	public void saveCase() {
		log.info("【创建索引前的数据条数】：{}",caseService.getAll().size());

		CaseDocument case1 = CaseDocumentBuilder.create()
				.addBusinessId("1")
				.addType(DocumentTypeEnum.CASE.getValue())
				.addTitle("天山区停水")
				.addDescription("天山区停水，天山区 红旗路 泰隆社区附加大面积停水，举报人：张三，联系电话：18811111111，日期：2019-10-01 16:00:00")
				.addCreateTime(new Date())
				.builder();

		CaseDocument case2 = CaseDocumentBuilder.create()
				.addBusinessId("2")
				.addType(DocumentTypeEnum.CASE.getValue())
				.addTitle("天山区停水")
				.addDescription("天山区停水，天山区 解放路 金河社区附加大面积停水，举报人：李四，联系电话：18811111112，日期：2019-10-09 16:00:00")
				.addCreateTime(new Date())
				.builder();

		CaseDocument case3 = CaseDocumentBuilder.create()
				.addBusinessId("3")
				.addType(DocumentTypeEnum.CASE.getValue())
				.addTitle("天山区停电")
				.addDescription("天山区停电，天山区 解放路 金河社区附加大面积停电，举报人：李四，联系电话：18811111112，日期：2019-10-09 16:00:00")
				.addCreateTime(new Date())
				.builder();

		CaseDocument case4 = CaseDocumentBuilder.create()
				.addBusinessId("4")
				.addType(DocumentTypeEnum.CASE.getValue())
				.addTitle("水磨沟区")
				.addDescription("水磨沟区排污管道破裂，水磨沟区 沙阳路向东500m路边污水管道破裂，举报人：王五，联系电话：18811111122，日期：2019-10-10 16:00:00")
				.addCreateTime(new Date())
				.builder();


		caseService.save(case1,case2,case3,case4);

		log.info("【创建索引后的数据条数】：{}",caseService.getAll().size());
	}

	@Test
	public void saveItem() {
		log.info("【创建索引前的数据条数】：{}",itemService.getAll().size());

		ItemDocument item1 = ItemDocumentBuilder.create()
				.addBusinessId("1")
				.addType(DocumentTypeEnum.ITEM.getValue())
				.addTitle("停水")
				.addDescription("停水，处理单位：水务局，时限：2小时")
				.addCreateTime(new Date())
				.builder();

		ItemDocument item2 = ItemDocumentBuilder.create()
				.addBusinessId("2")
				.addType(DocumentTypeEnum.ITEM.getValue())
				.addTitle("水管破裂")
				.addDescription("水管破裂，处理单位：水务局，时限：1小时")
				.addCreateTime(new Date())
				.builder();

		ItemDocument item3 = ItemDocumentBuilder.create()
				.addBusinessId("3")
				.addType(DocumentTypeEnum.ITEM.getValue())
				.addTitle("停电")
				.addDescription("分理项，停电，处理单位：供电局，时限：0.5小时")
				.addCreateTime(new Date())
				.builder();

		ItemDocument item4 = ItemDocumentBuilder.create()
				.addBusinessId("4")
				.addType(DocumentTypeEnum.ITEM.getValue())
				.addTitle("暖气不足")
				.addDescription("暖气不足，处理单位：供电局，时限：1小时")
				.addCreateTime(new Date())
				.builder();


		itemService.save(item1,item2,item3,item4);

		log.info("【创建索引后的数据条数】：{}",itemService.getAll().size());
	}

	@Test
	public void getAll(){
		caseService.getAll().parallelStream()
				.map(JSON::toJSONString)
				.forEach(System.out::println);
	}

	@Test
	public void deleteAll() {
		caseService.deleteAll();
	}

	@Test
	public void getById() {
		log.info("【根据ID查询内容】：{}", JSON.toJSONString(caseService.getById("154470178213401")));
	}


	@Test
	public void queryHit() {

		String keyword = "联通尿素";
		String indexName = "orders";

		List<Map<String,Object>> searchHits = searchService.queryHit(keyword,indexName,"productName","productDesc");
		log.info("【根据关键字搜索内容，命中部分高亮，返回内容】：{}", JSON.toJSONString(searchHits));
	}

	@Test
	public void queryHitByPage() {

		String keyword = "联通尿素";
		String indexName = "orders";

		Page<Map<String,Object>> searchHits = searchService.queryHitByPage(1,1,keyword,indexName,"productName","productDesc");
		log.info("【分页查询，根据关键字搜索内容，命中部分高亮，返回内容】：{}", JSON.toJSONString(searchHits));
	}

	@Test
	public void deleteIndex() {
		log.info("【删除索引库】");
		searchService.deleteIndex("orders");
	}

}
