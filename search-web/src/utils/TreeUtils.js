import lodash from 'lodash';

/**
 * 转换为tree对象
 */
export function convertToTreeData(arr, key = 'key', parentKey = 'parentKey', rootFilter) {

    let rs = [];

    let mapObj = {};

    let copyArr = [];

    arr.forEach((item) => {

        let newItem = { ...item };

        copyArr.push(newItem);

        mapObj[item[key]] = newItem;

    });

    copyArr.forEach((item) => {

        let pid = item[parentKey];

        let parent = null;

        if (pid) {

            parent = mapObj[pid];

            if (parent) {

                if (!parent.children) {

                    parent.children = [];

                }

                parent.children.push(item);

            }

        }

        if (!parent) {

            rs.push(item);

        }

        mapObj[item[key]] = item;

    });

    if (rootFilter) {

        rs = rs.filter(rootFilter);

    }

    return rs;

}
