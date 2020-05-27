import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter, Route, Redirect, Link } from 'react-router-dom'
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";
import { CardMedia } from "@material-ui/core";

 
const useStyles = makeStyles(() => ({
  root: {
    background: '#E03A3F',
    color: '#fff',
    height: '50px'
  },
  button: {
    background: '#E03A3F',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#FF8E53',
      borderColor: '#0062cc',
      boxShadow: 'none',
    }
  }
}))

const SelectCard = props => {
  const classes = useStyles()
  const { title, subtitle, description, imageUrl, url } = props;
  return (
    <Card>
      <CardHeader
        title={title}
        subheader={subtitle}
        className={classes.root}
      />
      <CardMedia style={{ height: "150px" }} image={imageUrl} />
      <CardContent style={{ height: "50px" }} >
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          className={classes.button}
          component={Link} 
          to={url}
        >
          Más Información
          </Button>
      </CardActions>
    </Card>
  );
};

export default SelectCard;