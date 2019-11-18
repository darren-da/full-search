import React from 'react';
import lodash from 'lodash'


const Table = ({data, dimsRow, dimsCol, mesu}) => {


    const groupdata = lodash.groupBy(data, (item) => {
        return dimsRow.map((row) => item[row.columnName])
    })
    console.log('groupdata',groupdata)

    const groupdata2 = lodash.groupBy(data, (item) => {
        return dimsCol.map((row) => item[row.columnName])
    })
    console.log('groupdata2',groupdata2)
    
    const colKeyArr = lodash.orderBy( lodash.keys(groupdata2), null, ['desc'])
    const tabledata = []

    // console.log('colKeyArr',colKeyArr)
    // console.log('colKeyArr',lodash.sortBy(lodash.keys(groupdata)))
    // console.log('colKeyArr',lodash.orderBy(lodash.keys(groupdata2)))
     
    //处理每行数据
    lodash.orderBy( lodash.keys(groupdata), null, ['asc']).forEach((rowKey) => {
        let colarr = groupdata[rowKey]
        let rowData = rowKey.split(',');
        colKeyArr.forEach((key, index) => {
            let searchObj = {}
            dimsCol.forEach((dimkey, keyIndex) => {
                searchObj[dimkey.columnName] = key.split(',')[keyIndex]
            })

            let coldata = lodash.filter(colarr, searchObj)
            if(coldata.length > 0){
                coldata.forEach(cd => {
                    mesu.map((value) => cd[value.columnName]).forEach(d => {
                        if(d) rowData.push(d)
                    })
                })
    
            }else{
                rowData.push(null)
            }
        })
        tabledata.push(rowData)
    })

    console.log('tabledata', tabledata)

    const headerdata = []
    if(tabledata.length > 0){
        //添加列维表头
        for (let i = 0; i < dimsCol.length; i++) {
            const hrow = [];
            //添加行维所在列的空白表头
            hrow.push({span: dimsRow.length, title: null})

            let tdobj = lodash.groupBy(colKeyArr, (item) => {
                return lodash.take(item.split(','), i+1)
            })
            
            for (const key in tdobj) {   
                const element = tdobj[key];
                hrow.push({span: element.length * mesu.length, title: key.split(',')[i]})
            }

            headerdata.push(hrow)
        }
        //添加指标表头
        const mesurow =[]
        dimsRow.forEach(item => {
            mesurow.push({span: 1, title: item.memberName})
        })
        colKeyArr.forEach(() => {
            mesu.forEach((mesuItem) => {
                mesurow.push({span: 1, title: mesuItem.memberName})
            })
        })
        headerdata.push(mesurow)
    }

    
    return (
        <div>
            <table style={{width: '100%', textAlign: 'center',  }} border="1" >
                <thead>
                    {headerdata.map((row, index) => 
                        <tr >
                            {row.map((col, colIndex) => 
                                <th colSpan={col.span} >{lodash.startsWith(col.title,'_') ? col.title.replace('_','') : col.title}</th>
                            )}
                        </tr>
                    )}
                </thead>
                <tbody  >
                    {tabledata.map((row, rowIndex) => 
                        <tr>
                            {row.map((col, colIndex) => {
                                if(colIndex < dimsRow.length){
                                    if(rowIndex > 0 && tabledata[rowIndex-1][colIndex] === col){
                               
                                        //需要排除前列不相同的情况
                                        if(colIndex > 0 && lodash.take(row, colIndex).join() !== lodash.take(tabledata[rowIndex-1], colIndex).join()){
                                            return <td>{lodash.startsWith(col,'_') ? col.replace('_','') : col}</td>
                                        }
            
                                        return <td style={{borderTop: '0px', borderBottom: '0px'}} >{" "}</td>
                                    }
                                        
                                    return <td style={{borderBottom: '0px'}} >{lodash.startsWith(col,'_') ? col.replace('_','') : col}</td>
                                }
                                    
                                return <td>{lodash.startsWith(col,'_') ? col.replace('_','') : col}</td>
                            })}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;