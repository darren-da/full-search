import React from 'react';
import { connect } from 'dva';
import styles from './index.css';

function testPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>  Welcome to testpage</h1>
      
      {/* <FilterPanel visible={true} /> */}
    </div>
  );
}

testPage.propTypes = {
};

export default connect()(testPage);
