import { Builder, JSX, loadImage } from "canvacord";
import { GroupIds, Item, WeaponSkinDefinition } from "../types";
import { Static_Data } from "./Static";
import utils from "../utils";

export default class SkinInventoryBuilder extends Builder {
    groupId: GroupIds;
    item: Item;
    constructor(groupId: GroupIds, item: Item) {
        // super(1092, 690);
        super(1629, 927);
        this.groupId = groupId;
        this.item = item;
    }

    // async render() {
    //     let img = await loadImage(`./skin_images/${utils.get_folder_id(this.groupId) == true ?
    //             (this.item as WeaponSkinDefinition).weapon_id :
    //             utils.get_folder_id(this.groupId)
    //         }/${this.item.id}.png`);
    //     let imgSize = utils.get_image_size_buffer(img.data);

    //     return <div style={{
    //         display: 'flex',
    //         flexDirection: 'column'
    //     }}>
    //         <div style={{
    //             display: 'flex',
    //             position: 'absolute',
    //             top: 0,
    //             left: 0,
    //             width: this.width,
    //             height: this.height,
    //             backgroundImage: `url(${Static_Data.skinBackgroundImage.toDataURL()})`,
    //             backgroundSize: `${this.width}px ${this.height}px`,
    //             backgroundRepeat: 'no-repeat'
    //         }}></div>
    //         <div style={{
    //             display: 'flex',
    //             margin: 0,
    //             padding: 0,
    //             flexDirection: (this.groupId == GroupIds.WeaponSkin && (this.item as WeaponSkinDefinition).display_header.length > 12) ? 'column' : 'row'
    //         }}>
    //             {this.groupId == 3 && <div style={{
    //                 display: 'flex',
    //                 alignItems: 'center',
    //                 justifyContent: 'center',
    //                 marginTop: '10px',
    //                 marginLeft: '10px',
    //                 alignSelf: 'flex-start',
    //                 marginBottom: '3px',
    //                 backgroundColor: 'white',
    //                 padding: '5px',
    //                 paddingTop: '10px',
    //                 height: '40px',
    //                 borderRadius: '4px'
    //             }}>
    //                 <p style={{
    //                     margin: 0,
    //                     padding: 0,
    //                     fontFamily: 'Aftika',
    //                     fontSize: '32px',
    //                     height: '34px',
    //                 }}>{(this.item as WeaponSkinDefinition).display_header.split('_').join(' ')}</p>
    //             </div>}
    //             <div style={{
    //                 display: 'flex',
    //                 alignItems: 'center',
    //                 justifyContent: 'center',
    //                 alignSelf: 'flex-start',
    //                 marginTop: '10px',
    //                 marginLeft: '10px',
    //                 marginBottom: '3px',
    //                 backgroundColor: 'white',
    //                 padding: '5px',
    //                 paddingTop: '10px',
    //                 height: '40px',
    //                 borderRadius: '4px'
    //             }}>
    //                 <p style={{
    //                     margin: 0,
    //                     padding: 0,
    //                     fontFamily: 'Aftika',
    //                     fontSize: '32px',
    //                     height: '34px',
    //                 }}>{this.item.name.toUpperCase().split('_').join(' ')}</p>
    //             </div>
    //         </div>
    //         <div style={{
    //             margin: 0,
    //             padding: 0,
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             position: 'relative',
    //             top: 0,
    //             left: 0,
    //             width: this.width,
    //             height: this.height,
    //         }}>
    //             {/* <img src={img.toDataURL()} width={(imgSize.width/imgSize.height)*251.16} height={251.16} style={{
    //                 transform: 'rotate(-11.08deg)',
    //                 marginBottom: '120px',
    //             }}/> */}
    //             <img src={img.toDataURL()} width={(imgSize.width / imgSize.height) * 153} height={153} style={{
    //                 margin: 0,
    //                 padding: 0,
    //                 transform: 'rotate(-11.08deg)',
    //                 marginBottom: '120px',
    //             }} />
    //             {/* <div style={{
    //                 display: 'flex',
    //                 margin: 0,
    //                 padding: 0,
    //                 width: (imgSize.width/imgSize.height)*153,
    //                 height: 153,
    //                 transform: 'rotate(-11.08deg)',
    //                 backgroundImage: `url(${})`,
    //                 backgroundSize: `${(imgSize.width/imgSize.height)*153}px ${153}px`,
    //                 backgroundRepeat: 'no-repeat',
    //                 marginBottom: '120px',
    //             }}></div> */}
    //         </div>
    //     </div>;
    // }

    async render() {
        let img = await loadImage(`./skin_images/${utils.get_folder_id(this.groupId) == true ?
            (this.item as WeaponSkinDefinition).weapon_id :
            utils.get_folder_id(this.groupId)
            }/${this.item.id}.png`);
        let imgSize = utils.get_image_size_buffer(img.data);

        return <div style={{
            margin: 0,
            padding: 0,
            width: this.width,
            height: this.height,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: '#212121'
        }}>
            <div style={{
                width: this.width,
                height: `768px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <img src={img.toDataURL()} width={(imgSize.width / imgSize.height) * (imgSize.width < 952 ? 553.5 : 369)} height={imgSize.width < 952 ? 553.5 : 369} style={{
                    margin: 0,
                    padding: 0
                }} />
            </div>
            <div style={{
                margin: 0,
                padding: 0,
                display: 'flex',
                width: this.width,
                gap: '15px',
                paddingLeft: '15px',
                paddingBottom: '15px',
                paddingRight: '15px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '792px',
                    justifyContent: 'center',
                    marginBottom: '3px',
                    paddingTop: '38.5px',
                    paddingBottom: '38.5px',
                    backgroundColor: '#323232',
                    borderRadius: '15px'
                }}>
                    <p style={{
                        margin: 0,
                        padding: 0,
                        color: 'white',
                        fontFamily: 'Aftika',
                        fontSize: '48px',
                        height: '42px',
                    }}>{this.groupId != GroupIds.WeaponSkin ? utils.get_simple_name(this.groupId, true) : (this.item as WeaponSkinDefinition).display_header.split('_').join(' ')}</p>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '792px',
                    marginBottom: '3px',
                    backgroundColor: '#323232',
                    paddingTop: '38.5px',
                    paddingBottom: '38.5px',
                    borderRadius: '15px'
                }}>
                    <p style={{
                        margin: 0,
                        padding: 0,
                        fontFamily: 'Aftika',
                        color: 'white',
                        fontSize: '48px',
                        height: '42px',
                    }}>{this.groupId != GroupIds.WeaponSkin ? this.item.name.split('_').join(' ') : (this.item as WeaponSkinDefinition).display_name.split('_').join(' ').split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' ')}</p>
                </div>
            </div>
        </div>;
    }
}
