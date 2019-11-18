import React from 'react';
import lodash from 'lodash'
import {instanceOf} from "prop-types";


const index_table_new = ({data, dimsRow, dimsCol, mesu}) => {


  const mData = data;
  let dataList = [];
  let rowOneList = [];
  let indexRowCol ;
  let html = '<div  style="border: 1px solid #333333;border-bottom-width: 0px;float: left;overflow-x: auto"> ';
  setData();
  function getHtmlText() {
    console.log(JSON.stringify(dataList))
  }


  /**
   *
   * 全部是行维的html 第一行
   */
  function getHtmlDataRow(dataList) {
    html = "<div  style='overflow-x: scroll;width: 100%'><table border='1' style='text-align: center;width: 100%;border: 1px solid #333333;'>";
    dataList.map(data => {
      html = html + "<tr><td rowspan='" + (getListRowNum(data.child) + 1) + "'>" + data.name + "</td></tr>";
      if (data.child.length === 0)
        html = html + "<tr><td rowspan='1'>" + data.count + "</td></tr>";
      else
        html = html + getHtmlRowString(data.child)
    });


    html = html + "</table></div>"
  }

  /**
   *
   * 全部是行维的html 递归
   */
  function getHtmlRowString(dataList) {

    let htmlString = "";
    dataList.map(data => {

      htmlString = htmlString + "<tr ><td rowspan='" + (getListRowNum(data.child) + 1) + "'>" + data.name + "</td></tr>"
      if (data.child.length === 0)
        htmlString = htmlString + "<tr><td rowspan='1'>" + data.count + "</td></tr>";
      else
        htmlString = htmlString + getHtmlRowString(data.child)
    });


    return dataList.length > 0 ? htmlString : "";
  }

  /**
   *
   * 全部是列维的html 第一行
   */
  function getHtmlDataCol(dataList) {
    let nextList = [];
    html = "<div  style='overflow-x: scroll;width: 100%'><table border='1' style='text-align: center;width: 100%;border: 1px solid #333333;'><tr>";

    dataList.map(data => {

      html = html + "<th colspan='" + getListNum(data.child) + "'>" + data.name + "</th>"
      if (data.child.length > 0)
        nextList.push(data.child)

    });
    html = html + "</tr>";

    if (nextList.length > 0)
    html = html + getHtmlColString(nextList, 2);
    else {
      html=html+"<tr>";
      dataList.map(data=>{
        html = html + "<td colspan='" + getListNum(data.child) + "'>" + data.count + "</td>"
      });

      html=html+"</tr>";
    }



    html = html + "</tr></table></div>"
  }

  /**
   *
   * 全部是行维的html 递归
   */
  function getHtmlColString(dataList, index) {
    let htmlString = "<tr>";
    let nextList = [];

    dataList.map(data => {
      data.map(data => {
        htmlString = htmlString + "<th nowrap='nowrap' colspan=" + getListNum(data.child) + ">" + data.name + "</th>";
        if (data.child.length > 0)
          nextList.push(data.child);
      });
    });
    htmlString = htmlString + "</tr>";
    if (nextList.length > 0) {
      htmlString = htmlString + getHtmlColString(nextList, 1)
    }else {
      htmlString = htmlString + "<tr>"

      dataList.map(data => {
        data.map(data=>{
          htmlString = htmlString + "<td>" + data.count + "</td>"
        });

      });
      htmlString = htmlString + "</tr>"
    }


    return dataList.length > 0 ? htmlString : "";
  }


  /**
   *
   * 有行维和列维的html获取
   */
  function getHtmlUnion() {
    html = "<div  style='overflow-x: scroll;width: 100%'><table border='1' style='text-align: center;width: 100%;border: 1px solid #333333;'>";
    let htmlCol = "";
    let htmlRow = "";

//先获取列维数据
    htmlCol = htmlCol + getHtmlUnionCol(dataList, 1);
  
    htmlRow = htmlRow + "<tr>";
    dimsRow.map(() => {
      htmlRow = htmlRow + "<th nowrap='nowrap'></th>"
    });
    let nextList = [];
    //rowOneList 是第一行行维数据
    rowOneList.map(data => {
      htmlRow = htmlRow + "<th nowrap='nowrap' colspan=" + getListNum(data.child) + ">" + data.name + "</th>"
      if (data.child.length > 0)
        nextList.push(data.child)

    });

    htmlRow = htmlRow + "</tr>";
    //获取行维html
    htmlRow = htmlRow + getHtmlUnionRow(nextList, 2);

    html = html + htmlRow + htmlCol;


  }

  /**
   *获取联合下列维html
   */
  function getHtmlUnionCol(dataList, index) {
    let htmlString = "";

    if (index ===dimsRow.length) {
      dataList.map(data => {
        data.child.map(data => {
          rowOneList.push(data)
        })
      });

      rowOneList = uniq(rowOneList)
    }

    dataList.map(data => {

        htmlString = htmlString + "<tr ><td nowrap='nowrap' rowspan='" + (getListUnionColNum(data.child, index) + 1) + "'>" + data.name + "</td></tr>" + (index < dimsRow.length ? getHtmlUnionCol(data.child, index + 1) : ("<tr>" + getHtmlUnionOneTd(data.child)) + "</tr>");

    });


    return dataList.length > 0 ? htmlString : "";
  }

  /**
   *获取联合下列维count
   */
  function getHtmlUnionOneTd(childList) {



    let htmlString = "";
    let sortList=childList;
    if (childList.length === rowOneList.length) {
      sortList=[];
      rowOneList.map(row=>{
        childList.map(data=>{
          if (row.name.indexOf(data.name)>=0)
            sortList.push(data)
        })
      })
    }
    htmlString = htmlString + getHtmlUnionOne(sortList);

      let currentIndex=0;
      for (let i = 0; i < rowOneList.length; i++) {
        if (rowOneList[i].name.indexOf(childList[0].name)>=0) {
          currentIndex = i;
          if (childList[0].child.length>0)
            currentIndex=currentIndex*childList[0].child.length
          break;
        }
      }
     let endString="";
    if (rowOneList[rowOneList.length - 1].name.indexOf("合计")>=0) {
      endString= htmlString.substring(htmlString.lastIndexOf("<td"),htmlString.length);
      htmlString = htmlString.substring(0, htmlString.lastIndexOf("<td"));
    }

        for (let i = 0; i < rowOneList.length*(rowOneList[0].child.length===0?1:rowOneList[0].child.length) - currentIndex-childList.length*(rowOneList[0].child.length===0?1:rowOneList[0].child.length) ; i++)
          htmlString = htmlString + "<td></td>";
        for (let i = 0; i < currentIndex; i++) {
          htmlString = "<td></td>" + htmlString;
        }
     htmlString=htmlString+endString;
    return htmlString
  }

  /**
   *
   * 全部联合下行维列维递归
   */
  function getHtmlUnionOne(childList) {

    let htmlString = "";
    childList.map(data => {
      htmlString = htmlString + (data.child.length === 0 ? ("<td nowrap='nowrap'>" + data.count + "</td>") : getHtmlUnionOne(data.child));
    });
    return htmlString
  }


  /**
   *
   * 联合下行维html
   */
  function getHtmlUnionRow(dataList, index) {
    let htmlString = "<tr>";
    let nextList = [];

    dimsRow.map(data => {
      htmlString = htmlString + "<th></th>"
    });

    dataList.map(data => {
      data.map(data => {
        htmlString = htmlString + "<th nowrap='nowrap' colspan=" + getListNum(data.child) + ">" + data.name + "</th>";
        if (data.child.length > 0)
          nextList.push(data.child);
      });
    });
    htmlString = htmlString + "</tr>";
    if (nextList.length > 0) {
      htmlString = htmlString + getHtmlUnionRow(nextList, 1)
    }

    return dataList.length > 0 ? htmlString : "";
  }



  getHtmlText();
  return (
    <div style={{width: "100%", float: "left", overflowX: "auto"}}>
      <button  onClick={tableToExcel}>导出</button>
      <div dangerouslySetInnerHTML={{__html: html}}/>
    </div>
  );


  function tableToExcel(){
    let str="";
    str=html.substring(html.indexOf("<tr"),html.lastIndexOf("</tr>"));

    //Worksheet名
    let worksheet = 'Sheet1'
    let uri = 'data:application/vnd.ms-excel;base64,';

    //下载的表格模板数据
    let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:x="urn:schemas-microsoft-com:office:excel" 
      xmlns="http://www.w3.org/TR/REC-html40">
      <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
        <x:Name>${worksheet}</x:Name>
        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
        </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        </head><body><table>${str}</table></body></html>`;
    //下载模板
    window.location.href = uri + base64(template)
  }

  function base64 (s) { return window.btoa(unescape(encodeURIComponent(s))) }

  function setData() {
      //只有行维的情况
    if (dimsRow.length > 0 && dimsCol.length === 0) {
      indexRowCol=dimsRow;

      getAllRowData(0);
      getHtmlDataRow(dataList)
    }
    //只有列维的情况
    if (dimsRow.length === 0 && dimsCol.length > 0) {
      indexRowCol = dimsCol;
      getAllRowData(0);
      getHtmlDataCol(dataList)
    }
    //同时有行维和列维的情况 先获取行维数据，再设置列维数据
    if (dimsRow.length > 0 && dimsCol.length > 0) {
      indexRowCol=dimsRow;
      getAllRowData(0);
      getColData(dataList, [])
      getHtmlUnion()
    }
    console.log(JSON.stringify(dataList))
  }

  /**
   *
   * 获取全部是行维数据或列维第一行
   */
  function getAllRowData(index) {
    dataList = [];
    if (index === 0) {
      mData.map(data => {
        for (let i in  data) {
          if (i.indexOf(indexRowCol[index].columnName) >= 0) {
            let dataTo = {"name": data[i], child: [], "count": data.count};
            dataList.push(dataTo)
          }
        }
      });
      dataList = uniq(dataList);
    }
    if (indexRowCol.length > 1)
      getData(index+1, dataList, [])
  }

  /**
   *
   * 获取全部行维或列维递归数据
   */
  function getData(index, dataList, limitResult) {

    dataList.map(limit => {
      mData.map(data => {
        for (let i in  data) {
          if (i.indexOf(indexRowCol[index].columnName) >= 0 && data[indexRowCol[index - 1].columnName].indexOf(limit.name) >= 0) {
            let count = 0;
            for (let k = 0; k < limitResult.length; k++) {
              if (data[indexRowCol[k].columnName].indexOf(limitResult[k]) >= 0)
                count++;
            }
            if (count === limitResult.length) {
              let dataTo = {"name": "", child: [], "count": data.count};
              dataTo.name = data[i];
              limit.child.push(dataTo)
            }
          }
        }
      });
      limit.child = uniq(limit.child)
      if (index < indexRowCol.length - 1) {
        let indexLimit = [];
        limitResult.map(result => {
          indexLimit.push(result)
        });
        indexLimit.push(limit.name);
        getData(index + 1, limit.child, indexLimit)
      }
    });
  }


  /**
   *获取列维数据第一行
   */
  function getColData(dataList, limitResult) {
    dataList.map(limit => {
      let indexLimit = [];
      limitResult.map(result => {
        indexLimit.push(result)
      });
      indexLimit.push(limit.name);

      if (limit.child.length > 0) {

        getColData(limit.child, indexLimit)
      } else {
        getColDataMore(0, limit, indexLimit)
      }
    })
  }

  /**
   *获取列维数据递归
   */
  function getColDataMore(index, limit, limitResult) {

    let coulumnList = [];
    dimsRow.map(name => {

      coulumnList.push(name.columnName);
    });
    dimsCol.map(name => {
      coulumnList.push(name.columnName);
    });
    mData.map(data => {
      for (let i in  data) {

        if (i.indexOf(dimsCol[index].columnName) >= 0 && data[coulumnList[index - 1 + dimsRow.length]].indexOf(limit.name) >= 0) {
          let count = 0;
          for (let k = 0; k < limitResult.length; k++) {
            if (data[coulumnList[k]].indexOf(limitResult[k]) >= 0)
              count++;
          }
          if (count === limitResult.length) {
            let dataTo = {"name": "", child: [], "count": data.count};
            dataTo.name = data[i];
            limit.child.push(dataTo)
          }
        }
      }
    });
    limit.child = uniq(limit.child)
    if (index < dimsCol.length - 1) {

      limit.child.map(limitChild => {
        let indexLimit = [];
        limitResult.map(result => {
          indexLimit.push(result)
        });
        indexLimit.push(limitChild.name);
        getColDataMore(index + 1, limitChild, indexLimit)
      });
    }
  }
  /**
   *获取列维数据下元素全部个数
   */
  function getListNum(list) {
    let num = 0;
    list.map(data => {
      num = num + getListNum(data.child)
    });
    return num === 0 ? 1 : num;
  }

  /**
   *获取行维数据下元素全部个数
   */
  function getListRowNum(list) {
    let num = list.length === 0 ? 1 : list.length;
    list.map(data => {
      num = num + getListRowNum(data.child)
    });
    return (num === 0 ? 1 : num);
  }
  /**
   *获取有行维下列维数据下元素全部个数
   */
  function getListUnionColNum(list, index) {
    let num = (list.length === 0) ? 1 : list.length;

    list.map(data => {

      num = num + (index < dimsRow.length ? getListUnionColNum(data.child, index + 1) : 1)

    });
    if (index >= dimsRow.length)
      num = 1;
    return (num === 0 ? 1 : num);
  }
  /**
   *数组去重
   */
  function uniq(arr) {

    let hash = [];
    let indexList = [];
    arr.map(data => {
      if (indexList.indexOf(data.name) < 0) {
        indexList.push(data.name)
        hash.push(data)
      }
    });


    let sortList=[];
    let lastData;
    hash.map(data=>{

     if (data.name.indexOf("合计")>=0)
      lastData=data;
     else
      sortList.push(data)

    });
    if (lastData !== undefined)
    sortList.push(lastData);

    return sortList;
  }
};

export default index_table_new;
