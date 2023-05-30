import *as React from 'react';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const cardData = {
    title: "식당 이름",
    subheader: "September 14, 2016",
    description: " 식당 정보 ",
};

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/result`);
    };

    return (
        <Card onClick={handleCardClick} sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {cardData.avatarLetter}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={cardData.title}
                subheader={cardData.subheader}
            />
            <CardMedia
                component="img"
                height="194"
                image="https://mblogthumb-phinf.pstatic.net/MjAyMTAxMDVfMTk3/MDAxNjA5ODU1MzMwMzky.wvLTYfsEB8w7QN6lJUrjKpNPF19zZM87ry3ZI-5_qRQg.Wb2WUreQBZbbl7AiZWQakBoTKxzNvTHtlsf7WOeqZgAg.JPEG.wto1213/1609855329476.jpg?type=w800"
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {cardData.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        이영민
                    </Typography>
                    <Typography paragraph>
                        아아
                    </Typography>
                    <Typography paragraph>
                        아이스아메리카노
                    </Typography>
                    <Typography>
                        손흥민
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
