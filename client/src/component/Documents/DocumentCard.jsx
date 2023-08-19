import React from 'react'
import './document.css'
import ArticleIcon from '@mui/icons-material/Article';

const DocumentCard = ({name,creationDate}) => {
  return (
    <div className='document-card'>
        <div className='doc-name'>
            <ArticleIcon />
            <span>{name}</span>
            {/* <span>{new Date(creationDate).toLocaleDateString()}</span> */}
        </div>
        <div className='doc-creation'>
            <span>{new Date(creationDate).toLocaleDateString()}</span>
        </div>

      
    </div>
    
  )
}

export default DocumentCard
