import { Outlet } from '@modern-js/runtime/router';
import { useAtom, useAtomValue } from 'jotai';

import NavigatorBar from '@/components/navigator-bar';
import { curseforgeAtom, curseforgeCategoriesAtom, gameVersionGroupsAtom } from '@/store';

import './index.less';
import { useEffect } from 'react';
import { notification } from 'antd';

export default function Layout() {
  const [gameVersionGroups, setGameVersionGroups] = useAtom(gameVersionGroupsAtom);
  const [curseforgeCategories, setCurseforgeCategories] = useAtom(curseforgeCategoriesAtom);

  const curseforge = useAtomValue(curseforgeAtom);
  
  useEffect(() => {
    curseforge.getGameVersionGroups().then((groups) => {
      notification.info({ message: `从CurseForge获取${groups.length}个游戏版本分组` });
      setGameVersionGroups(groups);
    });
    curseforge.getCategoryTree().then((cats) => {
      notification.info({ message: `从CurseForge获取${cats.length}个模组分类` });
      setCurseforgeCategories(cats);
    });
  }, [curseforge, setGameVersionGroups, setCurseforgeCategories]);

  return (
    <div className="root-layout">
      <NavigatorBar />
      <Outlet />
    </div>
  );
}
