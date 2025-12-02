import { Container } from "components/container/container";
import MyEditor from "../../components/form/postForm/postForm";

export const PostCreate = () => {
    return (
        <>

            <Container>
                <MyEditor url="/post" exitPath="/post" post={true} />
            </Container>

        </>
    );
};
