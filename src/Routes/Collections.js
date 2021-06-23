import React from 'react';
import {TokenCluster2} from '../clusters/token-cluster2'
import {useCurrentUser} from '../hooks/current-user'

export default () => {

function Token() {
    const cu = useCurrentUser()
    return (
      <TokenCluster2 address={cu.addr} />
    )
  }

  return (
    <div>
      <Token />
    </div>
  );
}