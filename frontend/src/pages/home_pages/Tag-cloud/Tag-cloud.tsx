import {useTopTags} from "../../../CustomHooks/useTopTags.tsx";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const TagCloud = () => {
    const topTags = useTopTags()

    const {t} = useTranslation()
  return(
      <div>
          <h1 className="text-2xl font-bold m-2">{t('topTags')}</h1>
          <div className='mt-4'>
              {topTags?.map(tag => (
                  <NavLink className='p-4 bg-gray-500 m-2 rounded-xl' to={'/search/'+tag._id.slice(1,tag._id.length)}>{tag._id}</NavLink>
              ) )}
          </div>
      </div>
  )
}