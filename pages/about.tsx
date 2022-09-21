import React, { useCallback, useEffect, useMemo, useState } from 'react'
import FlippingCard from '../components/FlippingCard';
import { getTradProjects, TradProject } from '../services';


const about = ({}) => {
    const [tradProjects, setTradProjects] = useState<TradProject[]>([]);

    // declare the async data fetching function
    const fetchData = useCallback(async () => {
        const tradProjects = (await getTradProjects() || []);
        setTradProjects(tradProjects);
    }, [])

    useEffect(() => {
      fetchData()
      // make sure to catch any error
      .catch(console.error);
    }, [fetchData])

    const orderedProjects = useMemo(() => tradProjects.sort((a, b) => (b.priority?.order || 0) - (a.priority?.order || 0)), [tradProjects])
    
    return (
        <div className='h-full w-full pl-10 pt-5'>
            <h4 className='mb-5 text-2xl font-finlandica-500'>En quelques mots...</h4>
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-10 mb-5'>
                <div className='bio lg:col-span-3'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac scelerisque quam, et molestie dui. Sed gravida dolor sed imperdiet maximus. Sed dui lacus, cursus non consectetur at, iaculis at odio. Pellentesque venenatis auctor purus. Maecenas sagittis nulla vel laoreet venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed placerat sollicitudin quam, at tempus leo vehicula sed. Duis venenatis est in pharetra euismod. Proin mattis id lacus eu aliquet. Fusce suscipit a justo consectetur dignissim. Phasellus venenatis est vel lacus iaculis imperdiet.

    Vivamus sodales eu arcu ac condimentum. Curabitur pretium bibendum massa sed vehicula. Praesent ullamcorper molestie aliquet. In aliquet ligula eget enim mollis tempor. Aliquam erat volutpat. Etiam lorem leo, tincidunt ut luctus at, auctor et risus. Ut a blandit diam. Pellentesque fringilla sapien velit, vel pharetra dolor cursus id. Suspendisse eu sodales odio, sit amet feugiat velit. Duis id metus imperdiet, venenatis odio non, hendrerit odio. Sed bibendum risus quis odio gravida, at molestie dui porta. Fusce non rhoncus sem. Nunc malesuada tincidunt magna, a aliquet ante facilisis vel. Phasellus dictum vel mauris sit amet luctus.
                </div>
                <div className='pl-10 lg:col-span-2'>
                    <div className='mb-10'>
                        <h3 className='mb-1 text-xl font-finlandica'>Parcours</h3>
                        <ul className='square-list pl-5'>
                            <li>2013-2015 : classes préparatoires littéraires, option B/L</li>
                            <li>2015-2018 : école d’ingénieur en sciences cognitives appliquées</li>
                            <li>2017 : échange universitaire à POSTECH (Pohang, Corée du Sud)</li>
                            <li>2018-2020 : master en linguistique informatique, parcours TAL</li>
                        </ul>
                    </div>
                    <div className=''>
                        <h3 className='mb-1 text-xl font-finlandica'>Prix</h3>
                        <ul className='square-list pl-5'>
                            <li>Oct. 2021 : Concours de traduction <span className='italic'>New Hallyu</span>
                            <br/>
                            <span className='italic'>LTI : Litterature Translation Institute of Korea</span>
                            <br/>
                            Deuxième Prix</li>
                            <li>Sept. 2021 : Meilleur article de la rédaction
                            <br/>
                            <span className='italic'>Korea.net</span></li>
                            <li>Juin 2021 : Concours d’expression orale en coréen
                            <br/>
                            <span className='italic'>Centre Culturel Coréen</span>
                            <br/>
                            Premier Prix</li>
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
