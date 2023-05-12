import BackButton from '@/app/components/back-button';
import Images from './images'

const Detail = () => {
    return (
        <>
            <BackButton />

            <Images />

            <h1 style={{fontSize: '1.75rem'}}>Shoe Title</h1>

            <div>
                <h2>Description</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, fugit accusamus officia magnam ab, repellat corrupti, ducimus saepe provident natus officiis fugiat pariatur sunt. Ratione animi explicabo odit molestias mollitia?</p>
            </div>
        </>
    );
}
 
export default Detail;