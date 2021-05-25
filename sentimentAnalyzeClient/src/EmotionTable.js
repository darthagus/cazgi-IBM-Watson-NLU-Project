import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {

  render() {
    let tb_ctr = 0;
    let tableEmotions = Object.entries(this.props.emotions).map(function (mapentry) {
      return (
        <tr key={tb_ctr++} >
          <td>{mapentry[0]} </td>
          <td>{mapentry[1]} </td>
          </tr>
        )
      })
      return (  
        <div>
         <table>
            <tbody>
              {tableEmotions}
          </tbody>
         </table>
          

        </div>
       
      );
        }
    
}
export default EmotionTable;
