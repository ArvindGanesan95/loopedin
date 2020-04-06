import React, { useEffect,Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserPosts } from "../../actions";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Card, Box } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReplyIcon from "@material-ui/icons/Reply";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  reply: {
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  cardContentInner: {
    marginTop: theme.spacing(-4)
  }
}));

const Post = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getUserPosts()
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          console.log(result);
          setItems(result.posts);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Fragment>
        {items.map(item => (
          <Card>
          <Box pt={2} px={2} pb={4}>
            <Box display="flex" justifyContent="space-between">
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    TP
                  </Avatar>
                }
                title="Test Loop 1"
                subheader={item.created}
              />
            </Box>
          </Box>
          <CardContent>
            <Box className={classes.cardContentInner} height="50px">
              <Typography variant="body2" color="textSecondary" component="p">
                {item.postContent}
              </Typography>
            </Box>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton
              className={classes.reply}
              onClick={handleExpandClick}
              aria-label="reply"
            >
              <ReplyIcon />
            </IconButton>
          </CardActions>
        </Card>
        ))}
      </Fragment>
    );
  }

  // return (
  //   <Fragment>
  //     <Card>
  //       <Box pt={2} px={2} pb={4}>
  //         <Box display="flex" justifyContent="space-between">
  //           <CardHeader
  //             avatar={
  //               <Avatar aria-label="recipe" className={classes.avatar}>
  //                 TP
  //               </Avatar>
  //             }
  //             title="Test Loop 1"
  //             subheader="September 14, 2016"
  //           />
  //         </Box>
  //       </Box>
  //       <CardContent>
  //         <Box className={classes.cardContentInner} height="50px">
  //           <Typography variant="body2" color="textSecondary" component="p">
  //             This impressive paella is a perfect party dish and a fun meal to
  //             cook together with your guests. Add 1 cup of frozen peas along
  //             with the mussels, if you like.
  //           </Typography>
  //         </Box>
  //       </CardContent>
  //       <CardActions disableSpacing>
  //         <IconButton aria-label="add to favorites">
  //           <FavoriteIcon />
  //         </IconButton>
  //         <IconButton
  //           className={classes.reply}
  //           onClick={handleExpandClick}
  //           aria-label="reply"
  //         >
  //           <ReplyIcon />
  //         </IconButton>
  //       </CardActions>
  //     </Card>
  //   </Fragment>
  // );
};

// Post.propTypes = {};
function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
    user: state.auth.user,
    loops: state.userConnections.userLoops,
    friends: state.userConnections.userFriends
  };
}
// export default connect(mapStateToProps, {
// getUserPosts
// })(Post);

 export default Post;
