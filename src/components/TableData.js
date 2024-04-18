import { useState,useEffect } from "react";
import ColumnResizer from "react-table-column-resizer";
import { FaEllipsisV } from "react-icons/fa";
import { columnData, EmptyDataFeedback } from "../constants/Data";
import '../styles/style.css';
 

export function TableData({dataPresent=true}) {
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoading,setIsLoading] = useState(true);



    useEffect(() => {
      if(isLoading)
      {
       fetch(`https://dummyjson.com/users?limit=10&skip=${offset}&select=id,firstName,lastName,age,gender,email`)
       .then(data => data.json())
       .then(resData => resData.users)
       .then(resData => {
        if(!resData.length)
        {
        setIsLoading(false);
        }
        else
        {
        setData([...data,...resData])
       }
       });
      }
    },[offset,dataPresent]);



    const handleScroll = () => {
        const element = document.getElementById('dynamicTable');
        if((element.scrollHeight - Math.round(element.scrollTop) === (element.clientHeight+1)) && isLoading)
        setOffset(x => x + 10);
    }


    

  return (
    <div id="dynamicTable" onScroll={dataPresent?handleScroll:null} className={dataPresent?"border border-solid border-[#DDE3EE] h-[52vh] w-[90vw] overflow-y-scroll m-[5vw] text-xs":"border border-solid border-[#DDE3EE] w-[90vw] m-[5vw] text-xs"}>
      <table className="w-full min-w-max table-auto text-left">
        <thead className="border-b border-[#DDE3EE] sticky top-[-1vh] h-8">
          <tr>
          {columnData.map((column,index) => (
           <><th key={index}
             className="bg-white p-4">
                  {column.Header}
            </th>
            {index!=columnData.length - 1?<ColumnResizer className="max-w-full min-w-0 w-0 bg-[#DDE3EE]" />:null}</>
          ))}
          </tr>
        </thead>
        <tbody>
          {dataPresent?data.map(({ id,firstName,age, gender, email }) => {
            const classes = "p-4";
            const resizerClass = "min-w-0 w-0 bg-[#DDE3EE]";
            return (
              <tr key={id} className="h-12 md:h-15">
                <td className={classes}>
                    {firstName}
                </td>
                <td className={resizerClass}></td>
                <td className={classes}>
                    {age}
                </td>
                <td className={resizerClass}></td>
                <td className={classes}>
                    {gender}
                </td>
                <td className={resizerClass}></td>
                <td className={classes}>
                    {email}
                </td>
                <td className={resizerClass}></td>
                <td className="p-4 w-2 content-center">
                    <FaEllipsisV />
                </td>
              </tr>
            );
          }):( <tr className="h-12 md:h-15">
          <td className="p-4 text-center" colSpan={9}>{EmptyDataFeedback}
          </td></tr>)}
        </tbody>
      </table>
    </div>
  );
}