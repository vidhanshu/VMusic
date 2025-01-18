import useMusicContext from "@/contexts/music-context/use-music-context";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ScrollShadow,
  useDisclosure,
} from "@nextui-org/react";
import { Inbox, ListEnd } from "lucide-react";
import React from "react";
import Typography from "./Typography";
import { SongListItem } from "./song-list/song-list-item";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import useAudioPlayerContext from "@/contexts/audio-player-context/use-audio-player-context";

const SongQueueModal = () => {
  const {
    queue: { songs },
    currentMusic,
    setQueue,
  } = useMusicContext();
  const { togglePlay, playThisSong } = useAudioPlayerContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSongClick = (idx: number, id: string) => {
    const isCurrentSongPlaying = currentMusic?.id === id;

    // if current song is already playing, then pause other wise set current song
    if (isCurrentSongPlaying) {
      togglePlay();
    }

    playThisSong(songs[idx]!);
  };

  const dragEnded = ({ source, destination }: DropResult) => {
    // if dropped outside the list
    if (!destination) return;
    // if dropped at same place as source
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
      return;

    const _arr = [...songs];
    //extracting the source item from the list
    const _item = _arr.splice(source.index, 1)[0]!;
    //inserting it at the destination index.
    _arr.splice(destination.index, 0, _item);
    // find active index
    const _activeIndex = _arr.findIndex((s) => s.id === currentMusic?.id);
    // setting the new queue
    setQueue({
      songs: _arr,
      activeIndex: _activeIndex,
    });
  };

  return (
    <>
      <Button
        isIconOnly
        radius="full"
        variant="flat"
        color="secondary"
        onClick={onOpen}
        endContent={<ListEnd size={16} />}
      />

      <Modal
        size="4xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        shouldBlockScroll={true}
        scrollBehavior="inside"
        placement="auto"
      >
        <ModalContent className="max-h-[80vh]">
          {songs.length ? (
            <ModalHeader className="flex flex-col gap-1">
              Drag & Drop to manage queue
            </ModalHeader>
          ) : null}
          <ModalBody>
            {!songs.length ? (
              <div className="py-6">
                <Typography
                  className="text-center text-white/50"
                  as="h1"
                  variant="T_Bold_H2"
                >
                  No queue found!
                </Typography>
                <Inbox className="mx-auto mt-6 h-20 w-20 text-white/50" />
              </div>
            ) : (
              <ScrollShadow className="border border-transparent px-2 pb-4">
                <DragDropContext onDragEnd={dragEnded}>
                  <Droppable
                    droppableId="songs-wrapper"
                    type="COLUMN"
                    direction="vertical"
                  >
                    {(provided) => (
                      <div
                        className="space-y-4"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {songs.map((song, index) => {
                          return (
                            <Draggable
                              key={song.id}
                              draggableId={song.id}
                              index={index}
                            >
                              {(_provided) => (
                                <div
                                  ref={_provided.innerRef}
                                  {..._provided.dragHandleProps}
                                  {..._provided.draggableProps}
                                >
                                  <SongListItem
                                    key={index}
                                    animate={false}
                                    showDuration={false}
                                    showPlayCount={false}
                                    showAddToQueue={false}
                                    showSongDownloader={false}
                                    showShareSongButton={false}
                                    handleSongClick={handleSongClick}
                                    idx={index}
                                    song={song}
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </ScrollShadow>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SongQueueModal;
