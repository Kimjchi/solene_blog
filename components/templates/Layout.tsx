import React from "react";
import { getTags, Tag } from "../../services";
import Footer from "../Footer";
import NavigationBar from "../NavigationBar";
import SearchCard from "../SearchCard";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <NavigationBar />
      <div className="container mx-auto p-5 mb-8 h-full">
        <div className="banner w-full flex flex-col h-48 content-center rounded-lg">
          <h1 className="m-auto md:text-7xl text-6xl">Obangsaek</h1>
        </div>
        <div className="main flex w-full my-2 h-1/2 md:space-x-4 -mt-10 pt-12">
          <div className="left-side flex-col w-1/6 mt-1 md:flex hidden">
            <div className="introduction text-center w-full py-1 mb-20">
              <div className="h-40 w-40 mx-auto mb-4">
                <img
                  src="https://media.graphassets.com/OK4eX2tTIqsWGCm01aWA"
                  alt="Une photo de Solene"
                  className="rounded-full h-full w-full object-cover"
                ></img>
              </div>
              <p className="mx-auto text-center px-2">
                Bienvenue à toi, lecteur !
                <br />
                Si tu es là, c’est sans doute parce que la Corée du Sud a, pour
                une raison ou pour une autre, piqué ton intérêt. Et si je fais
                fausse route, j’espère bien pouvoir me rattraper en t'emmenant
                avec moi sur le chemin d’une culture à multiples facettes.
                <br />
                Ici on parle de littérature et de cinéma, d’arts et d’histoire
                et de bien d’autres choses ; bref, de la Corée dans tous ses
                états.
              </p>
            </div>
            <SearchCard />
          </div>
          {children}
        </div>
      </div>
      <div className="mt-20 px-5 container mx-auto">
        <Footer />
      </div>
    </>
  );
};

export default Layout;
