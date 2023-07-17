
const SectionTitle = ({sectionHeading,sectionSubHeading}) => {
    return (
        <div  className="mx-auto text-center md:w-6/12 my-12">
            <h3 className="text-4xl   py-4">{sectionHeading}</h3>
            <div className="divider"></div> 
            <p className=" mb-2 font-medium text-xl">{sectionSubHeading}</p>

        </div>
    );
};

export default SectionTitle;