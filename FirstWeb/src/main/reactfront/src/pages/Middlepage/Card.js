import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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

export default function Carddata({ data }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const navigate = useNavigate();
  console.log(data.imageURL);
  const handleCardClick = () => {
    navigate(`/result`, { state: { data } });
    //navigate(`/result?id=${data.id}&title=${data.title}&description=${data.description}&address=${data.opentime}&pn=${data.pn}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        onClick={handleCardClick}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.title}
      />
      <CardMedia
        onClick={handleCardClick}
        component="img"
        height="194"
        image={data.imageURL[0].replace(/'/g, '')} // Remove single quotes
        alt="식당이미지"
      />
      <CardContent onClick={handleCardClick}>
        <Typography paragraph>상세주소: {data.address}</Typography>
        <Typography paragraph>영업시간: {data.opentime}</Typography>
        <Typography paragraph>전화번호: {data.pn}</Typography>
      </CardContent>
      {data.description && (
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      )}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data.description && data.description.length > 50
              ? expanded
                ? data.description
                : `${data.description.substring(0, 50)}...`
              : data.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

