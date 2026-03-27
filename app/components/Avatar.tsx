import { memo } from "react";
import { Image, View } from "react-native";

interface AvatarProps {
  uri: string;
  size?: number;
  enableUpload?: boolean
}

const Avatar = ({
  uri,
  size = 240,
}: AvatarProps) => {

  return <View>
    <Image source={{
        uri,
        width: size,
        height: size
      }} style={{borderRadius: "100%"}} />
  </View>
}

export default memo(Avatar)