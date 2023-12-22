import { RoomItemProps } from "@/components/shared/RoomItem";
import roomData from "@/mock/room.mock";
import { useEffect, useState } from "react";

const useRoomDetails = (id: number) => {
  const [room, setRoom] = useState<RoomItemProps | null>(null);

  useEffect(() => {
    if (!id) return;

    const selected = roomData.find((t) => t.id === id);

    if (!selected) {
      setRoom(null);
      return;
    }

    setRoom(selected);
  }, [id]);

  return room;
};

export default useRoomDetails;
