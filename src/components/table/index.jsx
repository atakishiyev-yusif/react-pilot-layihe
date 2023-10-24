import {MainContext, useContext} from '../../context/main-context/'
import {ReactTabulator} from 'react-tabulator';


export const Table = () => {
	const {json, columns} = useContext(MainContext);
	return(
        <>
           <ReactTabulator
            data={json}
            columns={columns}
            tooltips={true}
            options={{
            pagination: 'local',
            paginationSize: 15,
            }}
          />  
        </> )
}