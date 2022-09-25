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
                Tout juste arrivée sur les bancs de la classe préparatoire, c’est par le jeu du hasard, au détour d’une conversation, que je commence à m’intéresser à la Corée du Sud. Ce n’est ni la musique ni les dramas qui suscitent mon intérêt, mais la langue, dans toute son élégance. Immédiatement tombée sous le charme de ses sonorités, je me fais la promesse, lorsque mes études se feront moins chronophages, de m’y consacrer. Ce n’est que quelques années plus tard, alors élève en école d’ingénieur, que je me jette à l’eau. À cette époque, je mets toutes les chances de mon côté et candidate au programme d’échange de l’université de POSTECH. Quelques mois plus tard, je m’envole pour la Corée du Sud et y repartirai avec une certitude : celle de faire quelque chose avec ce pays ; avec la langue.
                <br/><br/>
                Poursuivant mon apprentissage au Centre Culturel Coréen deux ans plus tard, je décide, exhortée par ma professeure de coréen, de participer à un premier concours d’expression orale, puis un deuxième, cette fois-ci de sous-titrage. Durant trois mois, je me prends à l’exercice, ne laissant aucun répit à mon moi intérieur, qui, novice en traduction, avance et recule. Pourtant, aussi étrange que cela puisse paraître, ces moments-là forgent peu à peu mon engouement pour la traduction et me révèlent toute la beauté de cet exercice dont je me sens à la fois proche et étrangère.
                <br/><br/>
                Aspirante traductrice, ce blog est l’occasion pour moi de vous parler de la Corée, et plus spécifiquement de toutes ces petites choses qui, peu à peu, m’ont fait tomber en amour pour ce pays et sa culture. Bonne lecture ! :)
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
                            <li>Oct. 2021 : <span className='font-semibold'>Concours de traduction <span className='italic'>New Hallyu</span></span>
                            <br/>
                            <span className='italic'>LTI : Litterature Translation Institute of Korea</span>
                            <br/>
                            Deuxième Prix</li>
                            <li>Sept. 2021 : <span className='font-semibold'>Meilleur article de la rédaction</span>
                            <br/>
                            <span className='italic'>Korea.net</span></li>
                            <li>Juin 2021 : <span className='font-semibold'>Concours d’expression orale en coréen</span>
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
