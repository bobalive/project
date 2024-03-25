
import {CustomFieldPropsInterface} from "./CustomFieldProps.interface.ts";

export const   CustomFields = ({field ,fieldName}:CustomFieldPropsInterface)=>{
    return (<>
            {fieldName ? <div className="mb-4 flex items-center border rounded p-3">
                    <h2 className="text-lg font-semibold  mr-2">{fieldName}: </h2>
                {typeof field == 'boolean'
                    ?
                    <span className="text-sm text-start hover:bg-gray-950">
                        {field ? "YES!":'NO('}
                    </span>
                    :
                    <span className="text-start hover:bg-gray-950">
                        {field}
                    </span>
                }
                </div>
                : <></>}
    </>

    )
}