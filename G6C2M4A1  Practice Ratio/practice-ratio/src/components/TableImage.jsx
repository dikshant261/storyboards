import React from 'react'
import "./TableImage.css"
import table from "../assets/table.png"
import { useTranslation } from 'react-i18next'
const TableImage = () => {
    const {t}=useTranslation();
  return (
    <div className='table-container'>
      <img src={table} alt="Table" className='table-image' />
      <p className='table-text'>
        {t("questionOne")}
      </p>
    </div>
  )
}

export default TableImage