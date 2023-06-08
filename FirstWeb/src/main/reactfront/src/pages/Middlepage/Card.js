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
import Popover from '@mui/material/Popover';
import './Middlepage.css';

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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleExpandClick = (event) => {
    setAnchorEl(event.currentTarget);
    setExpanded((prev) => !prev);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/result`, { state: { data } });
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Card sx={{ maxWidth: 345 }} className="card">
      <CardHeader
        className="card-title"
        onClick={handleCardClick}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.title}
        titleTypographyProps={{ className: 'card-title' }}
      />

      <CardContent sx={{ pb: 0 }} onClick={handleCardClick}>
        <Typography variant="body2" color="text.secondary" className="custom-text">
          {data.address && data.address.length > 50
            ? `${data.address.substring(0, 50)}...`
            : data.address}
        </Typography>
      </CardContent>

      <CardActions disableSpacing sx={{ p: 0 }}>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <CardMedia
        onClick={handleCardClick}
        component="img"
        height="194"
        image={data.imageURL && data.imageURL[0] ? data.imageURL[0].replace(/'/g, '') : process.env.PUBLIC_URL + '/NO_IMAGE_1.png'}
        alt="식당이미지"
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography sx={{ p: 2 }} className="popover-content">
          {data.opentime &&
            <Typography paragraph>
              <span className="popup-text-title">· 영업시간 : </span>
              <span className="popup-text-data">{data.opentime}</span>
            </Typography>
          }
          {data.pn &&
            <Typography paragraph>
              <span className="popup-text-title">· 전화번호 : </span>
              <span className="popup-text-data">{data.pn}</span>
            </Typography>
          }
          {data.description &&
            <Typography paragraph>
              <span className="popup-text-title">· 상세정보 : </span>
              <span className="popup-text-data">{data.description}</span>
            </Typography>
          }
        </Typography>

      </Popover>
    </Card>
  );
}
