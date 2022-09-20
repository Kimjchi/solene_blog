import React, { useMemo } from 'react'
import FlippingCard from '../components/FlippingCard';
import { getTradProjects, TradProject } from '../services';


interface AboutProps {
    tradProjects: TradProject[]
}

const about = ({ tradProjects }: AboutProps) => {

    const orderedProjects = useMemo(() => tradProjects.sort((a, b) => (b.priority?.order || 0) - (a.priority?.order || 0)), [tradProjects])
    
    return (
        <div className='h-full w-full pl-10 pt-5'>
            <h4 className='mb-5 text-2xl font-finlandica-500'>En quelques mots...</h4>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-10 mb-5'>
                <div className='bio lg:col-span-3'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac scelerisque quam, et molestie dui. Sed gravida dolor sed imperdiet maximus. Sed dui lacus, cursus non consectetur at, iaculis at odio. Pellentesque venenatis auctor purus. Maecenas sagittis nulla vel laoreet venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed placerat sollicitudin quam, at tempus leo vehicula sed. Duis venenatis est in pharetra euismod. Proin mattis id lacus eu aliquet. Fusce suscipit a justo consectetur dignissim. Phasellus venenatis est vel lacus iaculis imperdiet.

    Vivamus sodales eu arcu ac condimentum. Curabitur pretium bibendum massa sed vehicula. Praesent ullamcorper molestie aliquet. In aliquet ligula eget enim mollis tempor. Aliquam erat volutpat. Etiam lorem leo, tincidunt ut luctus at, auctor et risus. Ut a blandit diam. Pellentesque fringilla sapien velit, vel pharetra dolor cursus id. Suspendisse eu sodales odio, sit amet feugiat velit. Duis id metus imperdiet, venenatis odio non, hendrerit odio. Sed bibendum risus quis odio gravida, at molestie dui porta. Fusce non rhoncus sem. Nunc malesuada tincidunt magna, a aliquet ante facilisis vel. Phasellus dictum vel mauris sit amet luctus.
                </div>
                <div className='pl-10'>
                    <div className='mb-10'>
                        <h3 className='mb-1 text-xl font-finlandica'>Parcours</h3>
                        <ul className='square-list pl-5'>
                            <li>Milk</li>
                            <li>Cheese</li>
                            <li>Blue cheese</li>
                            <li>Feta</li>
                        </ul>
                    </div>
                    <div className=''>
                        <h3 className='mb-1 text-xl font-finlandica'>Prix</h3>
                        <ul className='square-list pl-5'>
                            <li>Milk</li>
                            <li>Cheese</li>
                            <li>Blue cheese</li>
                            <li>Feta</li>
                        </ul>
                    </div>
                </div>
            </div>
            <h4 className='mb-5 text-2xl font-finlandica-500'>Mes projets de traduction</h4>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-5 mb-56'>
                { 
                    orderedProjects.map((project, index) => (
                        <FlippingCard 
                            imageURL={project.image?.url}
                            title={project.title}
                            platform={project.platform}
                            numberOfSubtitles={project.numberOfSubtitles}
                            genres={project.genres.map(genre => genre.nom)}
                            koreanName={project.koreanName || ""}
                            index={index}
                            key={index}                        
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default about

export async function getStaticProps() {
    const tradProjects = (await getTradProjects() || []);
  
    return {
      props: { tradProjects }
    }
  }