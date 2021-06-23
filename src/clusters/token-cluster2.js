import React, { useState } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"
import Collection2 from "../Routes/Collection2"

export function TokenCluster2({address}) {
  const [nftInfo, setNftInfo] = useState(null)
  const fetchTokenData = async () => {
    const encoded = await fcl
      .send([
        fcl.script`
        import Pixori from 0x05f5f6e2056f588b

        pub fun main(address: Address): [{String: String}] {
          let nftOwner = getAccount(address)  
          let capability = nftOwner.getCapability<&{Pixori.NFTReceiver}>(/public/NFTReceiver)
      
          let receiverRef = capability.borrow()
              ?? panic("Could not borrow the receiver reference")

          let allIDs = receiverRef.getIDs()
          var allMetadata: [{String: String}] = []
      
          for id in allIDs {
              allMetadata.append(receiverRef.getMetadata(id: id))
          }

          return allMetadata
        }
      `,
      fcl.args([fcl.arg(address, t.Address)]),
      ])
    
    const decoded = await fcl.decode(encoded)
    setNftInfo(decoded) 
  };
  
  const colorArr = new Array;
  fetchTokenData();


  return (
    <div>
      {
        nftInfo &&
        <div>
            {Object.keys(nftInfo).map(k => {
                colorArr[k] = nftInfo[k].color
              return (
                <p>
                  <Collection2 arr1={colorArr[k]} />
                </p>
              )
            })
            }
        </div>
      }
    </div>
  );
  
}