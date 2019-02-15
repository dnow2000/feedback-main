from models.manager import Manager
from tests.utils import create_article
from utils.logger import logger
from utils.screenshotmachine import capture

def create_articles(with_capture=False):
    logger.info('create_articles')

    articles_by_name = {}

    articles_by_name["Great Barrier"] = create_article(
        authors="James Delingpole",
        is_reviewable=True,
        summary="Like the thriving polar bear, like the recovering ice caps, like the doing-just-fine Pacific islands, the Great Barrier Reef has become a totem for the liberal-left not because it’s in any kind of danger but because it’s big and famous and photogenic and lots and lots of people would be really sad if it disappeared.",
        tags="great barrier;",
        title="Great Barrier Reef Still Not Dying, Whatever Washington Post Says…",
        url="https://www.breitbart.com/big-government/2017/03/20/delingpole-great-barrier-reef-still-not-dying-whatever-washington-post-says"
    )

    articles_by_name["Daily Mail inflates disagreement"] = create_article(
        authors="David Rose",
        summary="The Mail on Sunday today reveals astonishing evidence that the organisation that is the world’s leading source of climate data rushed to publish a landmark paper that exaggerated global warming and was timed to influence the historic Paris Agreement on climate change.",
        tags="data",
        title="Daily Mail inflates disagreement between scientists about data handling to make unsupported accusation of data manipulation",
        url="http://www.dailymail.co.uk/sciencetech/article-4192182/World-leaders-duped-manipulated-global-warming-data.html"
    )

    articles_by_name["Decline in the amount of dissolved oxygen"] = create_article(
        authors="Chris Mooney",
        is_reviewable=True,
        summary="A large research synthesis, published in one of the world’s most influential scientific journals, has detected a decline in the amount of dissolved oxygen in oceans around the world — a long-predicted result of climate change that could have severe consequences for marine organisms if it continues.",
        tags="ocean;oxygen",
        title="Scientists have just detected a major change to the Earth’s oceans linked to a warming climate",
        url="https://www.washingtonpost.com/news/energy-environment/wp/2017/02/15/its-official-the-oceans-are-losing-oxygen-posing-growing-threats-to-marine-life"
    )

    articles_by_name["Infection bactérienne"] = create_article(
        authors="Pascal Santi;Sandrine Cabut",
        is_reviewable=True,
        summary="Selon plusieurs organisations, les recommandations de prise en charge de cette infection bactérienne sont inadaptées.",
        tags="lyme;",
        title="Maladie de Lyme : fronde contre la Haute Autorité de santé",
        url="https://www.lemonde.fr/sciences/article/2018/07/24/maladie-de-lyme-fronde-contre-la-haute-autorite-de-sante_5335369_1650684.html"
    )

    articles_by_name["Global carbon budget 2014"] = create_article(
        authors="C. Le Quéré1, R. Moriarty1, R. M. Andrew2, G. P. Peters2, P. Ciais3, P. Friedlingstein4, S. D. Jones1, S. Sitch5, P. Tans6, A. Arneth7, T. A. Boden8, L. Bopp3, Y. Bozec9,10, J. G. Canadell11, L. P. Chini12, F. Chevallier3, C. E. Cosca13, I. Harris14, M. Hoppema15, R. A. Houghton16, J. I. House17, A. K. Jain18, T. Johannessen19,20, E. Kato21,22, R. F. Keeling23, V. Kitidis24, K. Klein Goldewijk25, C. Koven26, C. S. Landa19,20, P. Landschützer27, A. Lenton28, I. D. Lima29, G. Marland30, J. T. Mathis13, N. Metzl31, Y. Nojiri21, A. Olsen19,20, T. Ono32, S. Peng3, W. Peters33, B. Pfeil19,20, B. Poulter34, M. R. Raupach35,†, P. Regnier36, C. Rödenbeck37, S. Saito38, J. E. Salisbury39, U. Schuster5, J. Schwinger19,20, R. Séférian40, J. Segschneider41, T. Steinhoff42, B. D. Stocker43,44, A. J. Sutton13,45, T. Takahashi46, B. Tilbrook47, G. R. van der Werf48, N. Viovy3, Y.-P. Wang49, R. Wanninkhof50, A. Wiltshire51, and N. Zeng",
        is_reviewable=True,
        summary="Accurate assessment of anthropogenic carbon dioxide (CO2) emissions and their redistribution among the atmosphere, ocean, and terrestrial biosphere is important to better understand the global carbon cycle, support the development of climate policies, and project future climate change. Here we describe data sets and a methodology to quantify all major components of the global carbon budget, including their uncertainties, based on the combination of a range of data, algorithms, statistics, and model estimates and their interpretation by a broad scientific community. We discuss changes compared to previous estimates, consistency within and among components, alongside methodology and data limitations. CO2 emissions from fossil fuel combustion and cement production (EFF) are based on energy statistics and cement production data, respectively, while emissions from land-use change (ELUC), mainly deforestation, are based on combined evidence from land-cover-change data, fire activity associated with deforestation, and models. The global atmospheric CO2 concentration is measured directly and its rate of growth (GATM) is computed from the annual changes in concentration. The mean ocean CO2 sink (SOCEAN) is based on observations from the 1990s, while the annual anomalies and trends are estimated with ocean models. The variability in SOCEAN is evaluated with data products based on surveys of ocean CO2 measurements. The global residual terrestrial CO2 sink (SLAND) is estimated by the difference of the other terms of the global carbon budget and compared to results of independent dynamic global vegetation models forced by observed climate, CO2, and land-cover-change (some including nitrogen–carbon interactions). We compare the mean land and ocean fluxes and their variability to estimates from three atmospheric inverse methods for three broad latitude bands. All uncertainties are reported as ±1σ, reflecting the current capacity to characterise the annual estimates of each component of the global carbon budget. For the last decade available (2004–2013), EFF was 8.9 ± 0.4 GtC yr−1, ELUC 0.9 ± 0.5 GtC yr−1, GATM 4.3 ± 0.1 GtC yr−1, SOCEAN 2.6 ± 0.5 GtC yr−1, and SLAND 2.9 ± 0.8 GtC yr−1. For year 2013 alone, EFF grew to 9.9 ± 0.5 GtC yr−1, 2.3% above 2012, continuing the growth trend in these emissions, ELUC was 0.9 ± 0.5 GtC yr−1, GATM was 5.4 ± 0.2 GtC yr−1, SOCEAN was 2.9 ± 0.5 GtC yr−1, and SLAND was 2.5 ± 0.9 GtC yr−1. GATM was high in 2013, reflecting a steady increase in EFF and smaller and opposite changes between SOCEAN and SLAND compared to the past decade (2004–2013). The global atmospheric CO2 concentration reached 395.31 ± 0.10 ppm averaged over 2013. We estimate that EFF will increase by 2.5% (1.3–3.5%) to 10.1 ± 0.6 GtC in 2014 (37.0 ± 2.2 GtCO2 yr−1), 65% above emissions in 1990, based on projections of world gross domestic product and recent changes in the carbon intensity of the global economy. From this projection of EFF and assumed constant ELUC for 2014, cumulative emissions of CO2 will reach about 545 ± 55 GtC (2000 ± 200 GtCO2) for 1870–2014, about 75% from EFF and 25% from ELUC. This paper documents changes in the methods and data sets used in this new carbon budget compared with previous publications of this living data set (Le Quéré et al., 2013, 2014). All observations presented here can be downloaded from the Carbon Dioxide Information Analysis Center (doi:10.3334/CDIAC/GCP_2014).",
        tags="carbon;PeerVerified",
        title="Global carbon budget 2014",
        url="https://www.earth-syst-sci-data.net/7/47/2015/essd-7-47-2015.html"
    )


    articles_by_name["Fred Poulet"] = create_article(
        authors="Clarisse Fabre",
        is_reviewable=False,
        summary="C’est l’histoire d’un garçon qui voulait être Iggy Pop. A Mulhouse, dans les années 1980, il s’imaginait torse nu, le pantalon taille basse, électrisant les foules et se roulant par terre. Mais le rêve post-punk s’est dissous dans les paillettes des combinaisons disco. Et Fred Poulet s’est mis à écrire des chansons, tout en gagnant sa vie comme peintre sur des tournages de film. « C’est pour continuer à rêver que j’écris depuis une trentaine d’années. C’est un peu l’histoire de ma vie », résume le chanteur, emmitouflé dans son imperméable. A 57 ans,il revendique « la désinvolture » comme attitude, au sens de la liberté et de l’élégance.",
        tags="KFC;OnEstChampion;",
        title="Cocorico, Fred Poulet revient à la chanson",
        url="https://www.lemonde.fr/cinema/article/2019/01/10/cocorico-fred-poulet-revient-a-la-chanson_5407141_3476.html"
    )

    Manager.check_and_save(*articles_by_name.values())

    if with_capture:
        for article in articles_by_name.values():
            logger.info('capture screenshot for {}...'.format(article.url))
            thumb = capture(article.url)
            article.save_thumb(thumb, 0)
            logger.info('capture screenshot for {}...Done.'.format(article.url))

    logger.info('created {} articles'.format(len(articles_by_name)))

    return articles_by_name
