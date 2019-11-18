import React from 'react';
import { connect } from 'dva';
import styles from './index.css';
import FilterPanel from '../components/ChartUtils/lib/FilterPanel'

function testPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>  Welcome to testpage</h1>
      
      <FilterPanel visible={true} />
    </div>
  );
}

testPage.propTypes = {
};

export default connect()(testPage);
